import { BookmarksProvider } from "../src/hooks/useBookmarks"
import { QueryClient, QueryClientProvider } from "react-query"
import "../src/styles/globals.css"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 30, // 30 minutes
    },
  },
})

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <BookmarksProvider>
        <Component {...pageProps} />
      </BookmarksProvider>
    </QueryClientProvider>
  )
}

export default MyApp
