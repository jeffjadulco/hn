import { createContext, useContext, useEffect, useReducer } from "react"

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
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function BookmarksProvider({ children }) {
  const [state, dispatch] = useReducer(bookmarksReducer, {
    bookmarks: [],
    bookmarksData: [],
  })

  useEffect(() => {
    dispatch({ type: "LOAD" })
  }, [])

  const value = {
    bookmarks: state ? state.bookmarks : [],
    addBookmark: function (id) {
      dispatch({ type: "ADD", payload: id })
    },
    removeBookmark: function (id) {
      dispatch({ type: "REMOVE", payload: id })
    },
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
