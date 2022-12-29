import axiosClient from "./axiosClient";
const ratingMovieAPi = {
  createRating(data) {
    const url = "create/rating";
    return axiosClient.post(url,data);
  },
  getAllRatingOfMovie(id){
    const url = `get/ratings/movie/${id}`
    return axiosClient.get(url);
  }
  /* 
  getListMoviewByID(id) {
      const url = `api/lists/${id}`
      return axiosClient.get(url, id);
  },

  deleteMovieInList(id) {
    const url = `listMovie/delete/${id}`;
    return axiosClient.post(url);
  },

  updateMovieInList(id) {
    const url = `api/list/update/${id}`;
    return axiosClient.post(url);
  },

  createList() {
    const url = `create/list`;
    return axiosClient.post(url);
  }, */
};
export default ratingMovieAPi;
