import axiosClient from "./axiosClient";
const userApi = {
  login(data) {
    const url = "api/auth/login";
    return axiosClient.post(url, data);
  },
  updateUser(id, user) {
    const url = `api/users/${id}`;
    return axiosClient.put(url, user);
  },
};
export default userApi;
