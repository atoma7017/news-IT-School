const API_KEY = "e5a11195-a458-4be6-b8ea-ca7b1ccacc5c";

export function getNewsCategoriesEndpoint(category, pageNumber = 1, pageSize = 20) {
  const queryParams = `?api-key=${API_KEY}&section=${category}&show-fields=all&page-size=${pageSize}&page=${pageNumber}`;

  return `https://content.guardianapis.com/search${queryParams}`;
}

export function getNewsDetailsEndpoint(newsId) {
  const queryParams = `?api-key=${API_KEY}&show-fields=all`;

  return `https://content.guardianapis.com/${newsId}${queryParams}`;
}
