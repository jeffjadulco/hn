import Link from "next/link"
import { useEffect } from "react"
import { useBookmarks } from "../hooks/useBookmarks"
import { IconBookmarkOutline } from "./icons"
import PostCard from "./postCard"

const Bookmarks = () => {
  const { bookmarksData, fetchBookmarks } = useBookmarks()

  useEffect(() => {
    fetchBookmarks()
  }, [])

  return (
    <main className="flex-1">
      {bookmarksData && bookmarksData.length > 0 ? (
        bookmarksData.map((data) => <PostCard key={data.id} data={data} />)
      ) : (
        <NoBookmarks />
      )}
    </main>
  )
}

const NoBookmarks = () => {
  return (
    <div>
      <h3 className="text-2xl text-gray-600 font-bold text-center sm:text-left">
        No bookmarks 😞
      </h3>
      <p className=" text-gray-500 text-center sm:text-left">
        Press the save icon <IconBookmarkOutline /> on any post to bookmark it.
      </p>
    </div>
  )
}

export default Bookmarks
