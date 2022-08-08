export async function fetchPosts(url) {
  console.log("post api call made");
  let response = await fetch(url)
    .then((data) => data.json())
    .then((data) => data.data.children);
  return response;
}
