import { useQueries, useQueryClient } from "react-query"
import { useBookmarks } from "../hooks/useBookmarks"
import { IconBookmarkOutline } from "./icons"
import { PostCard } from "./postCard"
import { PostCardSkeleton } from "./postCardSkeleton"
import { getPostDataWithComments } from "../services/items"

const Bookmarks = () => {
  const { bookmarks } = useBookmarks()
  const queryCache = useQueryClient().getQueryCache()

  useQueries(
    bookmarks.map((bookmark) => ({
      queryKey: ["bookmarks", bookmark],
      queryFn: () => {
        return getPostDataWithComments(bookmark)
      },
    }))
  )

  return (
    <main className="flex-1">
      {bookmarks.map((bookmark) => {
        const {
          state: { isFetching, data },
        } = queryCache.find(["bookmarks", bookmark])
        if (isFetching) {
          return <PostCardSkeleton key={bookmark} />
        }
        return <PostCard key={bookmark} data={data} />
      })}
      {bookmarks.length === 0 && <NoBookmarks />}
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
