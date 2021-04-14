import { getPostData, getPostDataWithComments } from "./items"

export async function fetchBookmarks(postIds) {
  const promises = postIds.map(async (id) => await getPostData(id))
  return Promise.all(promises)
}
