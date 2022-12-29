
/* eslint-disable no-undef */
import axios from "axios";
import React, { useRef, useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/lomo-removebg-preview.png";
import handleError from "../../handleError";
import { toast } from "react-toastify";

import "./register.scss";
const Register = () => {
  let emailRef = useRef();
  let faceioInstance = null

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [face_id , setFaceId] = useState("");
  
  const handleStart = () => {
    setEmail(emailRef.current.value);
  };
  
  const handleFinish = async (e) => {
    e.preventDefault();
    console.log(username);
    try {
      await axios.post(
        "https://movieserverapi.azurewebsites.net/api/user/register",
        {
          email,
          password,
          username,
          face_id
        }
      );
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

useEffect(() => {
  const script = document.createElement('script')
  script.src = '//cdn.faceio.net/fio.js'
  script.async = true
  script.onload = () => loaded()
  document.body.appendChild(script)

  return () => {
    document.body.removeChild(script)
  }
// eslint-disable-next-line react-hooks/exhaustive-deps
})

const loaded = () => {
  console.log(faceIO)
  if (faceIO && !faceioInstance) {
    faceioInstance = new faceIO('fioa7256')
  }
}
const faceRegistration = async (e) => {
  e.preventDefault();
  try {
    const userInfo = await faceioInstance.enroll({
      locale: "auto",
      payload: {
        email: email,
        username: username,
      },
    })
    await axios.post(
        "https://movieserverapi.azurewebsites.net/api/user/register",
        {
          email,
          password: password,
          username: username,
          face_id:userInfo.facialId,
        }
      );
      navigate("/login");

    console.log(userInfo.payload.email)
    console.log('Unique Facial ID: ', userInfo.facialId)
    console.log('Enrollment Date: ', userInfo.timestamp)
    console.log('Gender: ', userInfo.details.gender)
    console.log('Age Approximation: ', userInfo.details.age)
  } catch (errorCode) {
    console.log(errorCode)
    handleError(errorCode)
  }
}
  return (
    <div className="register">
      <div className="top">
        <div className="wrapper">
          <img className="logo" src={logo} alt="" />
          <button className="loginButton">
            <Link to="/login">
              <b>Sign In</b>
            </Link>
          </button>
        </div>
      </div>
      <div className="container">
        <h1>Unlimited movies, TV shows, and more.</h1>
        <h2>Watch anywhere. Cancel anytime.</h2>
        <p>
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        {!email ? (
          <div className="input">
            <input type="email" placeholder="email address" ref={emailRef} />
            <button className="registerButton" onClick={() => handleStart()}>
              <b>Get Started</b>
            </button>
          </div>
        ) : (
          <form className="input">
            <input
              type="username"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
<button className="registerButton" onClick={(e) => faceRegistration(e)}>
              Start
            </button>

                   </form>
        )}
   
      </div>
    </div>
  );
};
export default Register;
