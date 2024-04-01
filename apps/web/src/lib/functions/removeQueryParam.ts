function removeQueryParam(paramToRemove: string) {
  // Create a URL object with the current window location
  const url = new URL(window.location.href);

  // Create a URLSearchParams object from the URL's search string
  const searchParams = new URLSearchParams(url.search);

  // Remove the specific query parameter
  searchParams.delete(paramToRemove);

  // Update the search string of the URL object
  url.search = searchParams.toString();

  // Update the current window location
  window.history.pushState({}, '', url.href);
}

export default removeQueryParam;
