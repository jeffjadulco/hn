function PostCardSkeleton() {
  return (
    <div className="mb-6 flex flex-col justify-around w-full h-11 animate-pulse">
      <span className="h-5 w-full max-w-xl bg-gray-700" />
      <span className="h-4 w-full max-w-xs bg-gray-800" />
    </div>
  )
}

export { PostCardSkeleton }
