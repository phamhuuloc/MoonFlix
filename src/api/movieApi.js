import axiosClient from "./axiosClient";

const movieApi = {
  getMovies() {
    const url = "movies";
    return axiosClient.get(url);
  },

  getMovieInfo(id) {
    const url = `api/movies/${id}`;
    return axiosClient.get(url);
  },

  getTopMovie() {
    const url = "api/movies/top"
    return axiosClient.get(url);
  },

  getRandomMovie(type) {
    const url = `api/movies/random?type=${type}`;
    return axiosClient.get(url);
  },
};

export default movieApi;
