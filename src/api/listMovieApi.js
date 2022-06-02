import axiosClient from "./axiosClient";
const listMovieApi = {
  getListMovie() {
    const url = "api/list";
    return axiosClient.get(url);
  },
};
export default listMovieApi;
