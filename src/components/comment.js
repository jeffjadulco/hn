import { formatDistanceToNowStrict, fromUnixTime } from "date-fns"
import { useState } from "react"
import classnames from "classnames"
import { IconUser } from "./icons"

export default function Comment({ data, op }) {
  const content = { __html: data.content }
  const indentStyle = `comment-indent-${data.level}`
  const shouldCollapseInitially =
    data && data.level > 3 && data.comments && data.comments.length > 0

  const [isCollapsed, setCollapsed] = useState(shouldCollapseInitially)

  const onToggleCollasped = (e) => {
    e.stopPropagation()

    const selection = window.getSelection()
    if (selection.type == "Range") return

    if (data.comments && data.comments.length > 0) setCollapsed(!isCollapsed)
  }

  return (
    <div className="group">
      <div
        className={`relative px-3 -ml-2 sm:-ml-3 -mr-3 py-2 -my-2 border-2 border-transparent sm:hover:border-gray-700 rounded-md sm:hover:bg-gray-900  hover:bg-gray-800 hover:bg-opacity-75 ${
          data.comments.length > 0 ? "cursor-pointer" : ""
        }`}
        onClick={onToggleCollasped}
      >
        {isCollapsed && (
          <div className="absolute right-0 mr-3 sm:mt-1 px-1 text-xs font-medium text-black bg-yellow-500 rounded-md cursor-default">
            +{data.comments.length}
          </div>
        )}
        <div className="text-sm font-normal text-gray-400 mb-1">
          <span>
            <IconUser />
            <span
              className={classnames({
                "bg-gray-800 text-gray-200 px-1 rounded-sm": data.user === op,
              })}
            >
              {data.user}
            </span>
          </span>
          <span className="text-gray-700"> • </span>
          <span>
            {formatDistanceToNowStrict(fromUnixTime(data.time), {
              addSuffix: true,
            })}
          </span>
        </div>
        <div
          className="prose max-w-3xl text-gray-300"
          dangerouslySetInnerHTML={content}
        />
      </div>
      <div className={`border-l-2 ${indentStyle}`} hidden={isCollapsed}>
        <div className="ml-3 sm:ml-5">
          {data.comments.map((comment) => (
            <Comment key={comment.id} data={comment} op={op} />
          ))}
        </div>
      </div>
    </div>
  )
}
