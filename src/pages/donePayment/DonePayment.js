import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./donePayment.scss";
import axios from "axios";

const DonePayment = () => {

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

  useEffect(() => {
    if (user) {
      const getPayment = async () => {
        try {
          const token = window.localStorage.getItem("token");
          console.log(currentParams);
          let res = await axios.post(
            "https://movieserverapi.azurewebsites.net/api/user/vnpay_ipn",
          );
          console.log(res)

          setPaymentInfo({
            payment: {
              vnp_Amount: res.currentParams.vnp_Amount,
              vnp_BankCode: res.currentParams.vnp_BankCode,
              vnp_BankTranNo: res.currentParams.vnp_BankTranNo,
              vnp_CardType: res.currentParams.vnp_CardType,
              vnp_OrderInfo: res.currentParams.vnp_OrderInfo,
              vnp_PayDate: res.currentParams.vnp_PayDate,
            },
            userInfo: {
              name: res.userInfo.name,
              email: res.userInfo.email,
            },
          });
        } catch (err) {
          setError({
            error: true,
            message: err.response.message,
          });
        }
      };
      getPayment();
    }
  }, []);

  return (
    <>
      <Navbar />
      {error.error ? (
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
      ) : (
        <div className="payment">
          <div className="payment-modal">
            <div className="form-group">
              <h2 className="mb-4 text-success">
                Thanh toán nạp tiền thành công
              </h2>
              <div className="payment-element">
                <label>Email người nhận</label>
                <p>{paymentInfo.userInfo.email}</p>
              </div>
              <div className="payment-element">
                <label>Số tiền</label>
                <p>{paymentInfo.payment.vnp_Amount} đồng</p>
              </div>
              <div className="payment-element">
                <label>Ngân hàng</label>
                <p>{paymentInfo.payment.vnp_BankCode}</p>
              </div>
              <div className="payment-element">
                <label>Mã thanh toán</label>
                <p>{paymentInfo.payment.vnp_BankTranNo}</p>
              </div>
              <div className="payment-element">
                <label>Loại thẻ</label>
                <p>{paymentInfo.payment.vnp_CardType}</p>
              </div>
              <div className="payment-element">
                <label>Nội dung</label>
                <p>{paymentInfo.payment.vnp_OrderInfo}</p>
              </div>
              <div className="payment-element">
                <label>Ngày thanh toán</label>
                <p>{paymentInfo.payment.vnp_PayDate}</p>
              </div>
            </div>
            <div className="mx-auto">
              <button className="btn btn-success">
                <Link to="/">Home</Link>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default DonePayment;
