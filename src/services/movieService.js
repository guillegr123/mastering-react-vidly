import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/movies";

export function getMovies() {
  return http.get(apiEndpoint);
}

export function getMovie(movieId) {
  return http.get(`${apiEndpoint}/${movieId}`);
}

export function saveMovie(movie) {
  const movieId = movie._id;

  if (movieId) {
    delete movie._id;
    return http.put(`${apiEndpoint}/${movieId}`, movie);
  } else {
    return http.post(apiEndpoint, movie);
  }
}

export function deleteMovie(movieId) {
  return http.delete(apiEndpoint + "/" + movieId);
}
