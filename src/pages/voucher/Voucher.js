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
import { userVoucherSlice } from "../../redux/reducer/userVoucher";
const Voucher = () => {
  const [voucherList, setVoucherList] = useState([]);
 
  const user = useSelector((state) => state.user.user)
  const dispatch = useDispatch();


  useEffect(() => {
    const getVoucherList = async () => {
      try {
        const res = await voucherApi.getVoucherList();
        setVoucherList(res.data);
        console.log(res.data)
      } catch (err) {
        console.log(err);
      }
    };
    getVoucherList();
  }, []);

  const userVoucherList = useSelector((state) => state.userVoucher.userVoucher);
  console.log(userVoucherList)
 

   const handleBuyVoucher = async (id) => {
    const result = userVoucherList.find((voucher) => voucher.id === id); 
    console.log(result)
    if (result == undefined) {
      try {
        const data = { uv_voucher_id: id, uv_user_id: user.id };
        console.log(data)
        
        // const res = await userApi.buyVoucher(data);
        // console.log(res)
        
        toast.success("Get voucher Successfully!");
    
        // dispatch(userVoucherSlice.actions.setuserVoucher(res.data));
        // const newUserInfo = await userApi.newUserInfo(userInfo._id);
        // window.localStorage.setItem("user", JSON.stringify(newUserInfo.user));
       
      } catch (err) {
        toast.error(err.response.data.message);
      }
    } else {
      // toast.error("The movie already exits in your movie list!");
      
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
                <div>
                <img
                  src={item.image}
                  alt=""
                  className="voucher-list__container__img"
                />
                </div>
            
                <div className="voucher-list__container__item__info">
                  <span>Percent Discount : {item.percent_discount}</span>
                </div>
                <div className="voucher-list__container__item__info">
                  <span>Point Cost : {item.point_cost}</span>
                </div>
                <div className="voucher-list__container__buttons">
                  <button
                    className="voucher-list__container__buttons-by"
                    onClick={() => handleBuyVoucher(item.id)}
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
