import axiosClient from "./axiosClient";

const movieApi = {
  getMovies() {
    const url = "api/movies";
    return axiosClient.get(url);
  },
  getMovieInfo(data) {
    const url = `api/movies/get`;
    return axiosClient.post(url, data);
  },

  getRandomMovie(type) {
    const url = `api/movies/random?type=${type}`;
    return axiosClient.get(url);
  },
};
export default movieApi;
