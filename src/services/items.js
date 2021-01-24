import "unfetch";

// https://github.com/HackerNews/API
const BASE_URL = "https://hacker-news.firebaseio.com/v0";

// https://github.com/tastejs/hacker-news-pwas
const ITEM_URL = "https://api.hnpwa.com/v0/item";

export async function getPostIds(limit = 20) {
  const ids = await fetch(`${BASE_URL}/topstories.json`).then((res) =>
    res.json()
  );
  return ids.slice(0, limit);
}

function limitComments(comment) {
  if (!comment || comment.level > 5) return null;

  // Found this trick to filter null/undefined items: https://www.michaeluloth.com/filter-boolean
  comment.comments = comment.comments.map(limitComments).filter(Boolean);
  return comment;
}

export async function getPostData(id) {
  const data = await fetch(`${ITEM_URL}/${id}.json`).then((res) => res.json());

  if (data.type != "job") {
    data.comments = [];
    return data;
  }

  return null;
}

export async function getPostDataWithComments(id) {
  const data = await fetch(`${ITEM_URL}/${id}.json`)
    .then((res) => res.json())
    .catch(e => {
      console.error(e);
    });

  if (!data) return null;

  var comments = [];
  if (data.comments) {
    comments = data.comments.map((comment) => limitComments(comment));
  }

  data.comments = comments;
  return data;
}

export async function getPosts(limit = 20) {
  const postIds = await getPostIds(limit);
  const promises = postIds.map(async (id) => await getPostData(id));
  return Promise.all(promises);
}
