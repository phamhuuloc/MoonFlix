import { useEffect, useState } from "react";
import "./voucher.scss";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import movieApi from "../../api/movieApi";
import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";
import voucherApi from "../../api/vouhcherApi";
import userApi from "../../api/userApi";
import { userSlice } from "../../redux/reducer/userSlice";
const Voucher = () => {
  const [voucherList, setVoucherList] = useState([]);
  let userInfo = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const getVoucherList = async () => {
      try {
        const res = await voucherApi.getVoucherList();
        setVoucherList(res.vouchers);
      } catch (err) {
        console.log(err);
      }
    };
    getVoucherList();
  }, []);
  const handleGetVoucher = async (id) => {
    try {
      const data = { voucher_id: id };
      const res = await userApi.buyVoucher(data);
      console.log(res);
      toast.success(res.message);
      const newUserInfo = await userApi.newUserInfo(userInfo._id);
      console.log(newUserInfo);
      window.localStorage.setItem("user", JSON.stringify(newUserInfo.user));
      dispatch(userSlice.actions.setUser(newUserInfo.user));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Navbar />
      <div className="voucher-list">
        <h3> Voucher </h3>
        <ul className="voucher-list__container">
          {voucherList.map((item) => {
            return (
              <li key={item.id} className="voucher-list__container__item">
                <img
                  src={item.image}
                  alt=""
                  className="voucher-list__container__img"
                />
                <div className="voucher-list__container__item__info">
                  <span>Point Cost: {item.point_cost}</span>
                </div>
                <div className="voucher-list__container__buttons">
                  <button
                    className="voucher-list__container__buttons-by"
                    onClick={() => handleGetVoucher(item._id)}
                  >
                    GET
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
export default Voucher;
