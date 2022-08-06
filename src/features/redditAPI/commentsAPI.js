export async function fetchComments(url) {
  console.log("comment api call made");
  let response = await fetch(url)
    .then((data) => data.json())
    .then((data) => data[1].data.children);
  console.log(response);
  return response;
}
