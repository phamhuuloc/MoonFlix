import axiosClient from "./axiosClient";

const movieApi = {
  getMovies() {
    const url = "api/movies";
    return axiosClient.get(url);
  },
  getMovieInfo(id) {
    const url = `api/movies/get/${id}`;
    return axiosClient.get(url);
  },

  getRandomMovie(type) {
    const url = `api/movies/random?type=${type}`;
    return axiosClient.get(url);
  },
};
export default movieApi;
