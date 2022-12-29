import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./donePayment.scss";
import axios from "axios";
import userApi from "../../api/userApi";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { userSlice } from "../../redux/reducer/userSlice";

const DonePayment = () => {
  const dispatch = useDispatch()
  const [paymentInfo, setPaymentInfo] = useState({
    payment: {
      vnp_Amount: "",
      vnp_BankCode: "",
      vnp_BankTranNo: "",
      vnp_CardType: "",
      vnp_OrderInfo: "",
      vnp_PayDate: "",
    },
    userInfo: {
      name: "",
      email: "",
    },
  });

  const [error, setError] = useState({
    error: false,
    message: "",
  });

  useEffect(() => {
    setPaymentInfo(paymentInfo);
  }, [paymentInfo]);

  let user = useSelector((state) => state.user.user);

  const [searchParams] = useSearchParams();

  const currentParams = Object.fromEntries([...searchParams]);
  const [Info ,setInfo] = useState(currentParams);
  console.log(currentParams)

  useEffect(() => {
    if (user) {
      const getPayment = async () => {
        try {
          // const token = window.localStorage.getItem("token");
        
          
          const res = await userApi.updateWalletBalanceUser(Info.vnp_Amount,user.id)
          const newUserInfo = await userApi.getUserInfo(user.id);
          window.localStorage.setItem(
              "user",
              JSON.stringify(newUserInfo.user)
          );
          console.log(newUserInfo.data);
          dispatch(userSlice.actions.setUser(newUserInfo.data));
          toast.success(res.message);
          // let res = await axios.post(
          //   "https://sever-json-netflix.herokuapp.com/api/user/vnpay_ipn",
     
          //   currentParams,
          //   {
          //     headers: {
          //       token: `Bearer ${token}`,
          //     },
          //   }
          // );

          // setPaymentInfo({
          //   payment: {
          //     vnp_Amount: res.data.paymentInfo.vnp_Amount,
          //     vnp_BankCode: res.data.paymentInfo.vnp_BankCode,
          //     vnp_BankTranNo: res.data.paymentInfo.vnp_BankTranNo,
          //     vnp_CardType: res.data.paymentInfo.vnp_CardType,
          //     vnp_OrderInfo: res.data.paymentInfo.vnp_OrderInfo,
          //     vnp_PayDate: res.data.paymentInfo.vnp_PayDate,
          //   },
          //   userInfo: {
          //     name: res.data.userInfo.name,
          //     email: res.data.userInfo.email,
          //   },
          // });
        } catch (err) {
          console.log(err)
          // setError({
          //   error: true,
          //   message: err.response.data.message,
          // });
        }
      };
      getPayment();
    }
  }, []);

  return (
    <>
      <Navbar />
      {/* {error.error ? (
        <div className="payment-modal">
          <div className="form-group">
            <h2 className="mt-4 text-danger">{error.message}</h2>
            <div className="mx-auto">
              <button className="mt-2 btn btn-success">
                <Link to="/">Home</Link>
              </button>
            </div>
          </div>
        </div>
      ) : ( */}
        <div className="payment">
          <div className="payment-modal">
            <div className="form-group">
              <h2 className="mb-4 text-success">
                Deposit Successfully
              </h2>
              {/* <div className="payment-element">
                <label>Email người nhận</label>
                <p>{paymentInfo.userInfo.email}</p>
              </div> */}
              <div className="payment-element">
                <label>Amount:</label>
                <p>{Info.vnp_Amount} đồng</p>
              </div>
              <div className="payment-element">
                <label>Bank</label>
                <p>{Info.vnp_BankCode}</p>
              </div>
              <div className="payment-element">
                <label>Code: </label>
                <p>{Info.vnp_BankTranNo}</p>
              </div>
              <div className="payment-element">
                <label>Card Type</label>
                <p>{Info.vnp_CardType}</p>
              </div>
              <div className="payment-element">
                <label>Descriptions:</label>
                <p>{Info.vnp_OrderInfo}</p>
              </div>
              <div className="payment-element">
                <label>Date:</label>
                <p>{Info.vnp_PayDate}</p>
              </div>
            </div>
            <div className="mx-auto">
              <button className="btn btn-success">
                <Link to="/">Home</Link>
              </button>
            </div>
          </div>
        </div>
      {/* )} */}
    </>
  );
};
export default DonePayment;
