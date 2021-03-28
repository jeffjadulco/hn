import { formatDistanceToNowStrict, fromUnixTime } from "date-fns";
import { useState } from "react";

export default function Comment({ data }) {
  const content = { __html: data.content }
  const indentStyle = `comment-indent-${data.level}`
  const shouldCollapseInitially = (data && data.level > 3) && (data.comments && data.comments.length > 0)

  const [isCollapsed, setCollapsed] = useState(shouldCollapseInitially);

  const onToggleCollasped = e => {
    // e.preventDefault()
    e.stopPropagation()

    const selection = window.getSelection();
    if (selection.type == "Range") return;

    if (data.comments && data.comments.length > 0)
      setCollapsed(!isCollapsed);
  }

  return (
    <div className="group">
      <div
        // className="relative hover:bg-[#0F172A] hover:bg-opacity-100 pl-3 -ml-3 -mr-3 py-2 -my-2"
        className={`relative pl-3 -ml-3 -mr-3 py-2 -my-2 border-2 border-transparent hover:border-gray-700 rounded-md hover:bg-gray-900 hover:bg-opacity-75 ${data.comments.length > 0 ? "cursor-pointer" : ""} transition-colors duration-200 ease-out`}
        onClick={onToggleCollasped}>
        {isCollapsed &&
          <div className="absolute right-0 mr-3 sm:mt-1 px-1 text-xs font-me text-black bg-yellow-500 rounded-sm cursor-default">
            +{data.comments.length}
          </div>}
        <div className="text-sm font-normal text-gray-500 mb-1">
          <span>by {data.user}</span>
          <span className="text-gray-700"> • </span>
          <span>
            {formatDistanceToNowStrict(fromUnixTime(data.time), {
              addSuffix: true,
            })}
          </span>
        </div>
        <div className="prose max-w-3xl text-gray-300" dangerouslySetInnerHTML={content} />
      </div>
      <div className={`my-4 border-l-2 rounded-sm ${indentStyle}`} hidden={isCollapsed}>
        <div className="ml-3 sm:ml-5">

          {data.comments.map(comment => <Comment key={comment.id} data={comment} />)}
        </div>
      </div>
    </div>
  )
}
