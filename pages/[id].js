import Link from "next/link";
import { useRouter } from 'next/router'
import { formatDistanceToNowStrict, fromUnixTime } from "date-fns";
import { getPostIds, getPostDataWithComments } from "../src/services/items";
import Comment from '../src/components/comment'

export default function Item({ data }) {
  const { isFallback } = useRouter();
  const content = { __html: data ? data.content : "" };

  if (isFallback) {
    return <></>
  }

  return (
    <div className="mx-auto max-w-3xl px-4 md:px-0">
      <header className="pt-40 sm:pt-20">
        <h1 className="pb-4 text-2xl sm:text-4xl font-black text-center sm:text-left text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-pink-500 to-red-500">
          <a
            href={data.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {data.title}
          </a>
        </h1>
        {data.content && <div className="prose mb-6" dangerouslySetInnerHTML={content} />}
        <div className="text-sm font-normal text-gray-400">
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
      <footer className="h-32 mx-auto max-w-3xl px-4 md:px-0 text-lg font-semibold text-gray-400 flex flex-col-reverse sm:flex-row items-center justify-center sm:justify-between">
        <span className="">
          Code and Design by{" "}
          <a
            href="https://jeffjadulco.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-500 border-b border-dashed border-gray-400"
          >
            Jeff Jadulco
          </a>
        </span>
        <a
          href="https://github.com/jeffjadulco/hn"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-yellow-500 border-b border-dashed border-gray-400"
        >
          Source
        </a>
      </footer>
    </div>
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
