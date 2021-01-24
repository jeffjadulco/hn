import { NextSeo } from "next-seo"
import Head from "next/head"

export const SEO = ({ title, description }) => {
  return (
    <>
      <NextSeo
        title={title}
        description={description}
        openGraph={{
          url: "https://hn.jeffjadulco.com",
          title: title,
          description: description,
          images: [
            {
              url: "/og.png"
            }
          ]
        }}
      />
      <Head>
        <link rel="icon" href="/favicon.png" />
      </Head>
    </>
  )
}
