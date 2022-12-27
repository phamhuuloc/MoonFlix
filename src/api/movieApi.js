import axiosClient from "./axiosClient";

const movieApi = {
  getMovies() {
    const url = "movies";
    return axiosClient.get(url);
  },

  getMovieInfo(data, id) {
    const url = `api/movies/${id}`;
    return axiosClient.post(url, data);
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
