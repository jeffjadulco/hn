import Link from "next/link"
import { formatDistanceToNowStrict, fromUnixTime } from "date-fns"

export default function PostCard({ data }) {
  const urlRegex = new RegExp(
    /[a-zA-Z0-9][a-zA-Z0-9-]{1,61}(?!w{1,}\.)[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+/
  )

  if (!data) return <></>

  return (
    <div className="mb-6">
      <a
        href={data.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-lg font-semibold leading-3 text-gray-300 hover:text-yellow-500 focus:text-yellow-500"
      >
        {data.title}
      </a>
      <div className="text-sm font-normal text-gray-400">
        <span>{data.points} points</span>
        <span className="text-gray-700"> • </span>
        <span>
          <Link href={`/${data.id}`}>
            <a className="border-b border-dotted border-gray-400 hover:text-white focus:text-white hover:border-solid">
              {data.comments_count} comment{data.comments_count != 1 && "s"}
            </a>
          </Link>
        </span>
        <span className="text-gray-700"> • </span>
        {/* <span>by {data.user}</span> */}
        <span>
          {formatDistanceToNowStrict(fromUnixTime(data.time), {
            addSuffix: true,
          })}
        </span>
        {urlRegex.test(data.url) && (
          <>
            <span className="text-gray-700"> • </span>
            <span>{data.url.match(urlRegex)}</span>
          </>
        )}
      </div>
    </div>
  )
}
