import { useEffect } from "react"
import { useBookmarks } from "../hooks/useBookmarks"
import PostCard from "./postCard"

const Bookmarks = () => {
  const { bookmarksData, fetchBookmarks } = useBookmarks()

  useEffect(() => {
    fetchBookmarks()
  }, [])

  return (
    <main className="flex-1">
      {bookmarksData &&
        bookmarksData.map((data) => <PostCard key={data.id} data={data} />)}
    </main>
  )
}

export default Bookmarks
