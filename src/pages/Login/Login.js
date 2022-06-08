import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userSlice } from "../../redux/reducer/userSlice";
import { toast } from "react-toastify";
import userApi from "../../api/userApi";
import logo from "../../images/lomo-removebg-preview.png";
import "./login.scss";
const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  return (
    <div className="login">
      <div className="top">
        <div className="wrapper">
          <img className="logo" src={logo} alt="" />
        </div>
      </div>
      <div className="container">
        <form>
          <h1>Đăng Nhập</h1>
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
          <button className="loginButton" onClick={(e) => handleLogin(e)}>
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
