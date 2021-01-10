import Head from 'next/head'
import PostCard from '../src/components/postCard'
import styles from '../src/styles/Home.module.css'
import { getPosts } from '../src/services/items';

export default function Home(props) {
  const {  data  } = props;

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {data &&
          data.map(data =><PostCard key={data.id} data={data} />
          )}
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
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
