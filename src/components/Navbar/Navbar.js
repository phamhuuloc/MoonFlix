import { Search } from "@material-ui/icons";
import { Notifications } from "@material-ui/icons";
import { AddCircleOutline } from "@material-ui/icons";
import { ArrowDropDown } from "@material-ui/icons";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userSlice } from "../../redux/reducer/userSlice";
import userApi from "../../api/userApi";
import "boxicons";
import "./navbar.scss";
const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isScrolled, setIsScrolled] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  let data = useSelector((state) => state.user.user);
  const getUserInfoLocal = () => {
    setUserInfo(data);
  };

  useEffect(() => {
    getUserInfoLocal();
    return () => {
      setUserInfo({});
    };
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = window.localStorage.getItem("token");
      if (token) {
        try {
          const newUserInfo = await userApi.newUserInfo(data._id);
          setUserInfo(newUserInfo.user);
          window.localStorage.setItem("user", JSON.stringify(newUserInfo.user));
          dispatch(userSlice.actions.setUser(newUserInfo.user));
        } catch (err) {
          console.log(err);
        }
      }
    };

    checkLoggedIn();
  }, []);
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
      display: "Vouchers",
      path: "/vouchers",
    },
    // {
    //   display: "My List",
    //   path: "/mylist",
    // },
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
            <Link to="/" className="logo">
              <i class="bx bx-movie-play bx-tada main-color"></i>Fl
              <span class="main-color main-color">i</span>x{/* <img */}
              {/*   src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png" */}
              {/*   alt="" */}
              {/* /> */}
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

              <Link to="/recharge">
                <AddCircleOutline className="wallet_add_money" />
              </Link>
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
