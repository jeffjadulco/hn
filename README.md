# Hacker News reader using Next.js
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
![Twitter Follow](https://img.shields.io/twitter/follow/jeffjadulco?style=social)

<p align="center">
<img src="https://raw.githubusercontent.com/jeffjadulco/hn/master/assets/readme-demo.gif" alt="Demo GIF" width="70%">
</p>

## Statically dynamic using ISR
With Next.js' [Incremental Static Regeneration (ISR)](https://nextjs.org/docs/basic-features/data-fetching#incremental-static-regeneration), dynamic content can be statically served. Existing pages can be updated once a request is made.

**Inspired by Brian Lovin's work.** Check it out [here](https://brianlovin.com/hn)!

## Development
First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Configuration
You can change the regeneration frequency by changing the `revalidate` value.
```js
export async function getStaticProps(context) {
  const posts = await getPosts();
  const data = posts.filter(Boolean)

  return {
    props: {
      data,
    },
    revalidate: 3600,
  };
}
```

You can also change the number of posts displayed by passing an integer to `getPosts`.

## Author

- [Jeff Jadulco](https://jeffjadulco.com)

## License

This project is open source and available under the [MIT License](LICENSE)
