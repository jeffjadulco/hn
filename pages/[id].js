import React from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { formatDistanceToNowStrict, fromUnixTime } from "date-fns"
import { getPostIds, getPostDataWithComments } from "../src/services/items"
import Comment from "../src/components/comment"
import { Footer } from "../src/components/footer"
import { SEO } from "../src/components/seo"
import {
  IconBack,
  IconBookmark,
  IconComment,
  IconHome,
  IconLink,
  IconPoints,
  IconTime,
} from "../src/components/icons"

export default function Item({ data }) {
  const { isFallback } = useRouter()
  const content = { __html: data ? data.content : "" }
  const urlRegex = new RegExp(
    /[a-zA-Z0-9][a-zA-Z0-9-]{1,61}(?!w{1,}\.)[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+/
  )

  if (isFallback) {
    return (
      <>
        <SEO
          title={"Hacker News"}
          description="My personal Hacker News reader"
        />
        <div className="min-h-screen flex items-center">
          <svg
            className="w-6 h-6 m-auto animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4.05 11a8 8 0 1 1 .5 4m-.5 5v-5h5" />
          </svg>
        </div>
      </>
    )
  }

  return (
    <>
      <SEO
        title={data.title}
        description={data.content ? data.content : data.title}
      />
      <div className="min-h-screen flex flex-col mx-auto max-w-3xl px-4 md:px-0">
        <header className="pt-40 sm:pt-20 mb-12">
          <Link href="/">
            <a className="hover:text-gray-300 text-gray-400">
              <IconHome />
            </a>
          </Link>
          <button className="hover:text-gray-300 text-gray-400" hidden>
            <IconBookmark />
          </button>
          <h1 className="mt-4 pb-4 text-2xl sm:text-4xl font-black text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-pink-500 to-red-500">
            <a href={data.url} target="_blank" rel="noopener noreferrer">
              {data.title}
            </a>
          </h1>
          <div className="text-center text-sm font-normal text-gray-400 flex flex-wrap space-x-3 items-center justify-center">
            <span>
              <IconPoints />
              {data.points} points
            </span>
            <span>
              <IconTime />
              {formatDistanceToNowStrict(fromUnixTime(data.time), {
                addSuffix: false,
              })}
            </span>
            <span>
              <Link href={`/${data.id}`}>
                <a className="hover:text-pink-400 focus:text-white transition-colors duration-300 ease-out">
                  <IconComment />
                  {data.comments_count} comment{data.comments_count != 1 && "s"}
                </a>
              </Link>
            </span>

            {urlRegex.test(data.url) && (
              <>
                <span>
                  <a
                    className="hover:text-pink-400 focus:text-white"
                    href={data.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <IconLink />
                    {data.url.match(urlRegex)}
                  </a>
                </span>
              </>
            )}
          </div>
          {data.content && (
            <React.Fragment>
              <div
                className="pt-8 prose max-w-3xl text-gray-300"
                dangerouslySetInnerHTML={content}
              />
              <div className="mt-12 mx-auto w-14">
                <div className="border-t-[3px] rounded-md border-pink-500" />
              </div>
            </React.Fragment>
          )}
        </header>
        <main className="flex-1 space-y-6">
          {/* Comments */}
          {data.comments.map((comment) => (
            <Comment key={comment.id} data={comment} />
          ))}
        </main>
        <Footer />
      </div>
    </>
  )
}

// Must provide paths because this dynamic route is generated at build time
// getStaticProps will then use the id in the params object
// See: https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation
export async function getStaticPaths() {
  const ids = await getPostIds()
  const paths = ids.map((id) => ({
    params: { id: id.toString() }, // Id should be a string
  }))

  return { paths, fallback: true }
}

export async function getStaticProps({ params }) {
  const data = await getPostDataWithComments(params.id)

  if (!data) {
    console.warn(`Can't find post data with id=${params.id}`)
    return {
      notFound: true,
    }
  }

  return {
    props: {
      data,
    },
    revalidate: 3600,
  }
}
