import { formatDistanceToNowStrict, fromUnixTime } from "date-fns"
import { useEffect, useState } from "react"
import classNames from "classnames"
import { IconUser } from "./icons"

export default function Comment({ data, op, collapseAll }) {
  const content = { __html: data.content }
  const indentStyle = `comment-indent-${data.level}`
  const shouldCollapseInitially =
    data && data.level > 3 && data.comments && data.comments.length > 0

  const [isCollapsed, setCollapsed] = useState(shouldCollapseInitially)

  useEffect(() => {
    setCollapsed(shouldCollapseInitially || collapseAll)
  }, [collapseAll])

  const onToggleCollasped = (e) => {
    e.stopPropagation()

    const selection = window.getSelection()
    if (selection.type == "Range") return

    // NOTE: 20210613: Allow collapsing of zero child parents to reduce layout height
    // if (data.comments && data.comments.length > 0)
    setCollapsed(!isCollapsed)
  }

  return (
    <div className="my-4 group">
      <div
        className={classNames(
          "relative px-3 py-2 -my-2 -ml-2 -mr-3 border-2 border-transparent rounded-md cursor-pointer sm:-ml-3 sm:hover:border-gray-700 sm:hover:bg-gray-900 hover:bg-gray-800 hover:bg-opacity-75 "
        )}
        onClick={onToggleCollasped}
      >
        {isCollapsed && data.comments && data.comments.length > 0 && (
          <div className="absolute right-0 px-1 mr-3 text-xs font-medium text-black bg-yellow-500 rounded-md cursor-default sm:mt-1">
            +{data.comments.length}
          </div>
        )}
        <div
          className={classNames("mb-1 text-sm font-normal text-gray-400", {
            "italic text-gray-500": isCollapsed,
          })}
        >
          <span>
            <IconUser />
            <span
              className={classNames({
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
        {!isCollapsed && (
          <div
            className="max-w-3xl prose text-gray-300"
            dangerouslySetInnerHTML={content}
          />
        )}
      </div>
      <div className={`border-l-2 ${indentStyle}`} hidden={isCollapsed}>
        <div className="ml-3 sm:ml-5">
          {data.comments.map((comment) => (
            <Comment
              key={comment.id}
              data={comment}
              op={op}
              collapseAll={collapseAll}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
