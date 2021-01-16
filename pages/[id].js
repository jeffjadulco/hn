import { useRouter } from 'next/router'
import { getPostIds, getPostDataWithComments } from "../src/services/items";

export default function Item({ data }) {
  const { isFallback } = useRouter();

  if (isFallback) {
    return <></>
  }

  return (
    <div>
      <h2>{data.title}</h2>
    </div>
  );
}

// Must provide paths because this dynamic route is generated at build time
// getStaticProps will then use the id in the params object
// See: https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation
export async function getStaticPaths() {
  const ids = await getPostIds();
  const paths = ids.map((id) => ({
    params: { id: id.toString() }, // Id should be a string
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const data = await getPostDataWithComments(params.id);

  return {
    props: {
      data,
    },
    revalidate: 3600,
  };
}
