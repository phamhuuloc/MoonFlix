import axiosClient from "./axiosClient";

const voucherApi = {
  getVoucherList() {
    const url = "api/vouchers/list?page=1";
    return axiosClient.get(url);
  },
  getVoucher() {
    const url = "api/vouchers/list?page=1";
    return axiosClient.get(url);
  },
};
export default voucherApi;
