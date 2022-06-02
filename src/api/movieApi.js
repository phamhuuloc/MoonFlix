import axiosClient from "./axiosClient";

const movieApi = {
  getMovies() {
    const url = "api/movies";
    return axiosClient.get(url);
  },
};
export default movieApi;
