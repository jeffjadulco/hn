import { formatDistanceToNowStrict, fromUnixTime } from "date-fns";

const borderColors = [""]

export default function Comment({ data }) {
  const content = { __html: data.content }
  const indentStyle = `comment-indent-${data.level}`

  return (
    <div className="group">
      <div className="hover:bg-gray-900 hover:bg-opacity-80 pl-3 -ml-3 py-2 -my-2">
        <div className="text-sm font-normal text-gray-400 mb-1">
          <span>by {data.user}</span>
          <span className="text-gray-700"> • </span>
          <span>
            {formatDistanceToNowStrict(fromUnixTime(data.time), {
              addSuffix: true,
            })}
          </span>
        </div>
        <div className="prose " dangerouslySetInnerHTML={content} />
      </div>
      <div className={`my-4 border-l-2 ${indentStyle}`}>
        <div className="ml-6 sm:ml-8">

          {data.comments.map(comment => <Comment key={comment.id} data={comment} />)}
        </div>
      </div>
    </div>
  )
}
