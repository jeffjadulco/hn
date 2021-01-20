

export const Footer = () => {
  return (
    <footer className="h-32 mt-20 sm:mt-36 mx-auto max-w-3xl px-4 md:px-0 text-lg font-semibold text-gray-400 flex flex-col-reverse sm:flex-row items-center justify-center sm:justify-between">
      <span className="">
        Code and Design by{" "}
        <a
          href="https://jeffjadulco.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-yellow-500 border-b border-dashed border-gray-400"
        >
          Jeff Jadulco
          </a>
      </span>
      <a
        href="https://github.com/jeffjadulco/hn"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-yellow-500 border-b border-dashed border-gray-400"
      >
        Source
        </a>
    </footer>
  )
}
