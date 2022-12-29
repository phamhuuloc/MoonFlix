import axiosClient from "./axiosClient";
const userApi = {
  login(data) {
    const url = "api/user/login";
    return axiosClient.post(url, data);
  },
  buyMovie(data) {
    const url = "api/userMovie/by-movie";
    return axiosClient.post(url, data);
  },
  buyVoucher(data) {
    const url = "/api/userVoucher/by-voucher";
    return axiosClient.post(url, data);
  },
  getAllMovieOfUser (id) {
      const url  = `/api/user/list-movies/${id}`
      return axiosClient.get(url)
  },
  getAllVoucherOfUser (id) {
    const url  = `/api/user/list-vouchers/${id}`
    return axiosClient.get(url)
},
// /*   newUserInfo(id) {
//     const url = `user/${id}`;
//     return axiosClient.get(url);
//   }, */

  updateUser(id, user) {
    const url = `api/user/update/${id}`;
    return axiosClient.post(url, user);
  },
  updateWalletBalanceUser(amount, id) {
    const url = `api/user/update/wallet/${amount}/${id}`;
    return axiosClient.post(url);
  },

  deleteUser(id) {
    const url = `api/user/delete/${id}`;
    return axiosClient.post(url);
  },


};
export default userApi;
