import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useCallback,
} from "react"
import { fetchBookmarks } from "../services/bookmarks"

const BookmarksContext = createContext()

function bookmarksReducer(state, action) {
  switch (action.type) {
    case "LOAD": {
      const stored = window.localStorage.getItem("bookmarks")
      const bms = JSON.parse(stored)
      return {
        ...state,
        bookmarks: bms || [],
      }
    }
    case "ADD": {
      const bms = [action.payload, ...state.bookmarks]
      window.localStorage.setItem("bookmarks", JSON.stringify(bms))
      return {
        ...state,
        bookmarks: bms,
      }
    }
    case "REMOVE": {
      let bms = [...state.bookmarks]
      bms.splice(bms.indexOf(action.payload), 1)
      window.localStorage.setItem("bookmarks", JSON.stringify(bms))
      return {
        ...state,
        bookmarks: bms,
      }
    }
    case "FETCH": {
      return {
        ...state,
        isFetching: true,
      }
    }
    case "FETCH-COMPLETED": {
      return {
        ...state,
        isFetching: false,
        bookmarksData: action.payload,
      }
    }
    case "FETCH-FAILED": {
      return {
        ...state,
        isFetching: false,
      }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

async function fetchBookmarksData(bookmarks, dispatch) {
  dispatch({ type: "FETCH" })
  try {
    const posts = await fetchBookmarks(bookmarks)
    dispatch({ type: "FETCH-COMPLETED", payload: posts })
  } catch (error) {
    dispatch({ type: "FETCH-FAILED" })
  }
}

function BookmarksProvider({ children }) {
  const [state, dispatch] = useReducer(bookmarksReducer, {
    bookmarks: [],
    bookmarksData: [],
  })
  const { bookmarks } = state

  useEffect(() => {
    dispatch({ type: "LOAD" })
  }, [])

  const fetchBookmarks = useCallback(() => {
    fetchBookmarksData(bookmarks, dispatch)
  }, [bookmarks])

  useEffect(() => {
    fetchBookmarksData(bookmarks, dispatch)
  }, [bookmarks])

  const value = {
    bookmarks: state ? state.bookmarks : [],
    bookmarksData: state ? state.bookmarksData : {},
    addBookmark: function (id) {
      dispatch({ type: "ADD", payload: id })
    },
    removeBookmark: function (id) {
      dispatch({ type: "REMOVE", payload: id })
    },
    fetchBookmarks,
  }

  return (
    <BookmarksContext.Provider value={value}>
      {children}
    </BookmarksContext.Provider>
  )
}

function useBookmarks() {
  const context = useContext(BookmarksContext)
  if (context === undefined) {
    throw new Error("useBookmarks must be used within a BookmarksProvider")
  }
  return context
}

export { useBookmarks, BookmarksProvider }
