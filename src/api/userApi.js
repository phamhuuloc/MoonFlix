import axiosClient from "./axiosClient";
const userApi = {
  login(data) {
    const url = "api/auth/login";
    return axiosClient.post(url, data);
  },
  byMovie(data) {
    const url = "api/users/get/movie";
    return axiosClient.post(url, data);
  },
  byVoucher(data) {
    const url = "api/users/get/voucher";
    return axiosClient.post(url, data);
  },

  newUserInfo(id) {
    const url = `api/users/find/${id}`;
    return axiosClient.get(url);
  },

  updateUser(id, user) {
    const url = `api/users/${id}`;
    return axiosClient.put(url, user);
  },
};
export default userApi;
