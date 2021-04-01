import { BookmarksProvider } from "../src/hooks/useBookmarks"
import "../src/styles/globals.css"

function MyApp({ Component, pageProps }) {
  return (
    <BookmarksProvider>
      <Component {...pageProps} />
    </BookmarksProvider>
  )
}

export default MyApp
