import axiosClient from "./axiosClient";

const voucherApi = {
  getVoucherList() {
    const url = "vouchers";
    return axiosClient.get(url);
  },

  getVoucher(id) {
    const url = `voucher/{id}`;
    return axiosClient.get(url);
  },
};
export default voucherApi;
