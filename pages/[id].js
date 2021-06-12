import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { formatDistanceToNowStrict, fromUnixTime } from "date-fns"
import { getPostIds, getPostDataWithComments } from "../src/services/items"
import Comment from "../src/components/comment"
import { Footer } from "../src/components/footer"
import { SEO } from "../src/components/seo"
import {
  IconBookmarkOutline,
  IconBookmarkSolid,
  IconComment,
  IconLink,
  IconPoints,
  IconTime,
} from "../src/components/icons"
import { useBookmarks } from "../src/hooks/useBookmarks"
import { truncate } from "../src/lib/utils"
import { useQueryClient } from "react-query"

export default function Item({ data }) {
  const { isFallback, query } = useRouter()
  const { bookmarks, addBookmark, removeBookmark } = useBookmarks()

  const cached = useQueryClient()
    .getQueryCache()
    .find(["bookmarks", Number(query.id)])

  const handleBookmarkClick = (_) => {
    if (bookmarks.includes(data.id)) {
      removeBookmark(data.id)
    } else {
      addBookmark(data.id)
    }
  }

  if (cached && cached.state.data) {
    return (
      <PostContent
        data={cached.state.data}
        isSaved={bookmarks.includes(cached.state.data.id)}
        onClickSave={handleBookmarkClick}
      />
    )
  }

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
    <PostContent
      data={data}
      isSaved={bookmarks.includes(data.id)}
      onClickSave={handleBookmarkClick}
    />
  )
}

function PostContent({ data, onClickSave, isSaved }) {
  const [collapseAll, setCollapsedAll] = useState(false)

  const toggleCollapseAll = () => {
    setCollapsedAll(!collapseAll)
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
            <a className="inline-flex items-center hover:bg-gray-900 hover:ring-2 hover:ring-gray-700 rounded-md py-1 pr-3 text-xs sm:text-sm text-gray-400 transition-colors duration-150 ease-out">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                ></path>
              </svg>
              Back
            </a>
          </Link>
          <h1 className="mt-4 pb-4 text-2xl sm:text-4xl font-black text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-pink-500 to-red-500 hover:bg-gradient-to-l">
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
              <button
                className="group hover:text-gray-200 transition-colors duration-300 ease-out"
                onClick={() => {
                  toggleCollapseAll()
                }}
              >
                <IconComment />
                <span className="border-b border-dotted group-hover:border-transparent">
                  {data.comments_count} comment
                  {data.comments_count != 1 && "s"}
                </span>
              </button>
            </span>
            {data.domain && (
              <React.Fragment>
                <span>
                  <a
                    className="group hover:text-gray-200"
                    href={data.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <IconLink />
                    <span className="border-b border-dotted group-hover:border-transparent">
                      {truncate(data.domain, 40)}
                    </span>
                  </a>
                </span>
              </React.Fragment>
            )}
            <button className="group hover:text-gray-200" onClick={onClickSave}>
              {isSaved ? (
                <React.Fragment>
                  <IconBookmarkSolid />
                  <span className="group-hover:border-transparent border-b border-dotted">
                    Saved
                  </span>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <IconBookmarkOutline />
                  <span className="group-hover:border-transparent border-b border-dotted">
                    Save
                  </span>
                </React.Fragment>
              )}
            </button>
          </div>
          {data.content && (
            <React.Fragment>
              <div
                className="pt-8 prose max-w-3xl text-gray-300"
                dangerouslySetInnerHTML={{ __html: data ? data.content : "" }}
              />
              <div className="mt-12 mx-auto w-14">
                <div className="border-t-[3px] rounded-md border-pink-500" />
              </div>
            </React.Fragment>
          )}
        </header>
        <div className="flex-1 space-y-6">
          {/* Comments */}
          {data.comments.map((comment) => (
            <Comment
              key={comment.id}
              data={comment}
              op={data.user}
              collapseAll={collapseAll}
            />
          ))}
        </div>
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
    revalidate: 60 * 10,
  }
}
