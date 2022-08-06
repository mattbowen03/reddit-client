export async function fetchPosts(url) {
  let response = await fetch(url)
    .then((data) => data.json())
    .then((data) => data.data.children);
  console.log("post api call made");
  return response;
}
