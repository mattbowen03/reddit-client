export async function fetchComments(url) {
  let response = await fetch(url)
    .then((data) => data.json())
    .then((data) => data[1].data.children);
  return response;
}
