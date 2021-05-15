import { PostCard } from "./postCard"

const Posts = ({ data }) => {
  return (
    <main className="flex-1">
      {data && data.map((data) => <PostCard key={data.id} data={data} />)}
    </main>
  )
}

export default Posts
