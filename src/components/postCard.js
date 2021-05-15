import Link from "next/link"
import { formatDistanceToNowStrict, fromUnixTime } from "date-fns"
import { truncate } from "../lib/utils"

export default function PostCard({ data }) {
  if (!data) return <></>

  const titleClassName =
    "text-lg font-semibold leading-3 text-gray-300 group-hover:text-yellow-500 focus:text-yellow-500"

  return (
    <div className="group mb-6">
      {data.url === data.id ? (
        <Link href={`/${data.id}`}>
          <a className={titleClassName}>{data.title}</a>
        </Link>
      ) : (
        <a
          href={data.url}
          target="_blank"
          rel="noopener noreferrer"
          className={titleClassName}
        >
          {data.title}
        </a>
      )}
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
        {data.domain && (
          <>
            <span className="text-gray-700"> • </span>
            <span>{truncate(data.domain, 40)}</span>
          </>
        )}
      </div>
    </div>
  )
}
