import { Search } from "@material-ui/icons";
import { Notifications } from "@material-ui/icons";
import { AddCircleOutline } from "@material-ui/icons";
import { ArrowDropDown } from "@material-ui/icons";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userSlice } from "../../redux/reducer/userSlice";
import "./navbar.scss";
const Navbar = () => {
  let userInfo = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isScrolled, setIsScrolled] = useState(false);
  const headerNav = [
    {
      display: "HomePage",
      path: "/",
    },
    {
      display: "Series",
      path: "/series",
    },
    {
      display: "Movies",
      path: "/movies",
    },
    {
      display: "New and popular",
      path: "/",
    },
    {
      display: "My List",
      path: "/",
    },
  ];
  const { pathname } = useLocation();

  const active = headerNav.findIndex((e) => e.path === pathname);

  const user = (window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
  });

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    dispatch(userSlice.actions.setUser(""));
    navigate("/login");
  };

  return (
    <>
      <div className={isScrolled ? "navbar scrolled" : "navbar"}>
        <div className="container">
          <div className="left">
            <Link to="/">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
                alt=""
              />
            </Link>
            <ul>
              {headerNav.map((e, i) => {
                return (
                  <li key={i} className={`${i === active ? "active" : " "}`}>
                    <Link to={e.path}>{e.display}</Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="right">
            <div className="wallet">
              <span className="wallet_balance">
                <b>Balance: </b>
                {userInfo.wallet_balance}
              </span>
              <span className="wallet_point">
                <b>Point: </b>
                {userInfo.point}
              </span>

              <AddCircleOutline className="wallet_add_money" />
            </div>

            <Search className="icon" />
            <Notifications className="icon" />
            <img src={userInfo ? userInfo.profilePic : ""} alt="" />
            <div className="profile">
              <ArrowDropDown className="icon" />
              <ul className="options">
                <li className="option-item">
                  <Link
                    to={{ pathname: "/user/" + userInfo._id }}
                    state={{ user: userInfo }}
                  >
                    Setting
                  </Link>
                </li>
                <li className="option-item" onClick={() => handleLogout()}>
                  Logout
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Navbar;
