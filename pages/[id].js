import Link from "next/link";
import { useRouter } from 'next/router'
import { formatDistanceToNowStrict, fromUnixTime } from "date-fns";
import { getPostIds, getPostDataWithComments } from "../src/services/items";
import Comment from '../src/components/comment'
import { Footer } from "../src/components/footer";
import { SEO } from "../src/components/seo";

export default function Item({ data }) {
  const { isFallback } = useRouter();
  const content = { __html: data ? data.content : "" };

  if (isFallback) {
    return <>
      <SEO title={"Hacker News"} description="My personal Hacker News reader" />
    </>
  }

  return (
    <>
      <SEO title={data.title} description={data.content ? data.content : data.title} />
      <div className="mx-auto max-w-3xl px-4 md:px-0">
        <header className="pt-40 sm:pt-20">
          <Link href="/">
            <a className="inline-flex items-center hover:bg-gray-800 rounded-sm py-1 pr-2 text-xs sm:text-sm">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
              Back
            </a>
          </Link>
          <h1 className="mt-4 pb-4 text-2xl sm:text-4xl font-black text-center sm:text-left text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-pink-500 to-red-500">
            <a
              href={data.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {data.title}
            </a>
          </h1>
          {data.content && <div className="prose mb-6" dangerouslySetInnerHTML={content} />}
          <div className="text-center sm:text-left text-sm font-normal text-gray-400">
            <span>{data.points} points</span>
            <span className="text-gray-700"> • </span>
            <span>
              <Link href={`/${data.id}`}>
                <a className="border-b border-dashed border-gray-400 hover:text-white focus:text-white">
                  {data.comments_count} comment{data.comments_count != 1 && "s"}
                </a>
              </Link>
            </span>
            <span className="text-gray-700"> • </span>
            <span>
              {formatDistanceToNowStrict(fromUnixTime(data.time), {
                addSuffix: true,
              })}
            </span>
            {data.url && (
              <>
                <span className="text-gray-700"> • </span>
                <span>
                  {data.url.match(
                    /[a-zA-Z0-9][a-zA-Z0-9-]{1,61}(?!w{1,}\.)[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+/
                  )}
                </span>
              </>
            )}
          </div>
        </header>
        <div className="mt-6 mb-6">
          <div className="border-t border-dashed border-gray-400" />
        </div>
        <main className="space-y-6">
          {/* Comments */}
          {data.comments.map(comment => <Comment key={comment.id} data={comment} />)}
        </main>

        <Footer />
      </div>
    </>
  );
}

// Must provide paths because this dynamic route is generated at build time
// getStaticProps will then use the id in the params object
// See: https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation
export async function getStaticPaths() {
  const ids = await getPostIds();
  const paths = ids.map((id) => ({
    params: { id: id.toString() }, // Id should be a string
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const data = await getPostDataWithComments(params.id);

  return {
    props: {
      data,
    },
    revalidate: 3600,
  };
}
