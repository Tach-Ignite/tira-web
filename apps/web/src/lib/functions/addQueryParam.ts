function addQueryParam(key: string, value: string) {
  // Create a URL object with the current window location
  const url = new URL(window.location.href);

  // Create a URLSearchParams object from the URL's search string
  const searchParams = new URLSearchParams(url.search);

  // Set the new query parameter
  searchParams.set(key, value);

  // Update the search string of the URL object
  url.search = searchParams.toString();

  // Update the current window location
  window.history.pushState({}, '', url);
}

export default addQueryParam;
