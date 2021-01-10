import PostCard from "./postCard";

const Posts = ({ data }) => {
  return (
    <main className="max-w-3xl mx-auto px-4 md:px-0">
      {data && data.map((data) => <PostCard key={data.id} data={data} />)}
    </main>
  );
};

export default Posts;
