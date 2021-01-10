import Head from "next/head";
import { getPosts } from "../src/services/items";
import Posts from "../src/components/posts";

export default function Home({ data }) {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="mx-auto max-w-3xl px-4 md:px-0 py-40 sm:py-20 ">
        <h1 className="text-4xl sm:text-6xl font-black text-center sm:text-left text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-pink-500 to-red-500">
          Hacker News
        </h1>
      </header>
      <Posts data={data} />

      <footer className="h-32 mx-auto max-w-3xl px-4 md:px-0 text-lg font-semibold text-gray-400 flex flex-col-reverse sm:flex-row items-center justify-center sm:justify-between">
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
    </div>
  );
}

export async function getStaticProps(context) {
  const data = await getPosts();

  // This is a cool addition to Next.js. They call it Incremental Static Regeneration
  // See: https://nextjs.org/docs/basic-features/data-fetching#incremental-static-regeneration
  return {
    props: {
      data,
    },
    revalidate: 3600,
  };
}
