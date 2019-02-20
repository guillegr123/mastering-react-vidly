import http from "./httpService";

export function getMovies() {
  return http.get("movies");
}

export function deleteMovie(id) {
  return http.delete(id);
}
