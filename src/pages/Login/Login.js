/* eslint-disable no-undef */
import axios from "axios";
import React, { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userSlice } from "../../redux/reducer/userSlice";
import { toast } from "react-toastify";
import userApi from "../../api/userApi";
import logo from "../../images/lomo-removebg-preview.png";
import {TbFaceId} from "react-icons/tb"
import "./login.scss";
import handleError from "../../handleError";
const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let faceioInstance = null;

  // handle login using email ans password
  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const res = await userApi.login(data);
      window.localStorage.setItem("token", res.token);
      window.localStorage.setItem("user", JSON.stringify(res.data));
      dispatch(userSlice.actions.setUser(res.data));
      toast.success("Login SuccessFully!");
      navigate("/");
      console.log(res);
    } catch (err) {
      console.log(err);
      toast.error("Wrong password or eamail!");
    }
  };
  // fetch data using InfomationFaceID
  const handleLoginFaceId = async(InfomationFaceID) => {
    try{
      const res = await userApi.login(InfomationFaceID);
      window.localStorage.setItem("token", res.token);
      window.localStorage.setItem("user", JSON.stringify(res.data));
      dispatch(userSlice.actions.setUser(res.data));
      toast.success("Login SuccessFully!");
      navigate("/");
      console.log(res);

    }catch (err){
      console.log(err);
      toast.error("Wrong password or eamail!");

    } 
  }

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://cdn.faceio.net/fio.js'
    script.async = true
    script.onload = () => loaded()
    document.body.appendChild(script)
  
    return () => {
      document.body.removeChild(script)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  const loaded = () => {
    console.log(faceIO)
    if (faceIO && !faceioInstance) {
      faceioInstance = new faceIO('fioa2005')
    }
  }
  // handle login with face ID
  const faceSignIn = async (e) => {
    e.preventDefault();
    try {
      console.log(faceioInstance)
      const userData = await faceioInstance.authenticate({
        locale: "auto",
      })
      // console.log(userData)
      // console.log(data);
      console.log('Unique Facial ID: ', userData.facialId)
      const userInfomation ={email:userData.payload.email, password:userData.facialId}; 
      await handleLoginFaceId(userInfomation);
      console.log('PayLoad: ', userData.payload.email)
    } catch (errorCode) {
      console.log(errorCode)
      handleError(errorCode)
    }
  }
  
  return (
    <div className="login">
      <div className="top">
        <div className="wrapper">
          <img className="logo" src={logo} alt="" />
        </div>
      </div>
      <div className="container">
        <form>
          <div className="container_header">
           <h1>Đăng Nhập</h1>
            <i onClick={(e) => faceSignIn(e)}>
              <TbFaceId></TbFaceId>
            </i>
          </div>
          <input
            type="email"
            placeholder="Enter your email or phone number"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Enter your password here"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
         <button className="loginButton" onClick={(e)=> handleLogin(e)}>
            <b>Đăng Nhập</b>
          </button>
 
          <span>
            Net to LoMo?
            <Link to="/register">
              <b>Đăng Ký Ngay</b>
            </Link>
          </span>
          <small>
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot. <b>Đọc Thêm</b>
          </small>
        </form>
      </div>
    </div>
  );
};
export default Login;
