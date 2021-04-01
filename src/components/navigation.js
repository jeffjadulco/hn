import { IconBookmarkOutline, IconPosts, IconSettings } from "./icons"
import Panel from "../lib/panel"

const Navigation = ({
  onClickPosts,
  onClickSaved,
  onClickSettings,
  activePanel,
}) => {
  const isActive = (panel) => {
    return panel === activePanel
  }

  return (
    <nav className="flex mt-3 sm:mt-2 space-x-3 text-sm justify-center sm:justify-start">
      <button
        onClick={onClickPosts}
        className={`focus:outline-none hover:text-yellow-500 ${
          isActive(Panel.posts) ? `text-gray-300` : `text-gray-500`
        }`}
      >
        <IconPosts />
        Posts
      </button>
      <button
        onClick={onClickSaved}
        className={`focus:outline-none hover:text-yellow-500 ${
          isActive(Panel.bookmarks) ? `text-gray-300` : `text-gray-500`
        }`}
      >
        <IconBookmarkOutline />
        Saved
      </button>
      <button
        onClick={onClickSettings}
        className={`focus:outline-none hover:text-yellow-500 ${
          isActive(Panel.settings) ? `text-gray-300` : `text-gray-500`
        }`}
        hidden
      >
        <IconSettings />
        Settings
      </button>
    </nav>
  )
}

export default Navigation
