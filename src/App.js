import "./App.css";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Watch from "./pages/Watch/Watch";
import Login from "./pages/Login/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { Slide, ToastContainer } from "react-toastify";
import Footer from "./components/Footer/Footer";
import User from "./pages/user/User";
import Detail from "./pages/detail/Detail";
import DonePayment from "./pages/donePayment/DonePayment";
import Voucher from "./pages/voucher/Voucher";
import MyList from "./pages/mylist/MyList";
import "react-toastify/dist/ReactToastify.css";
import Recharge from "./pages/recharge/Recharge";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3Jnj-z-MpU3XCNIvEQmRFKow6JIsLVX4",
  authDomain: "netflixapp-2c04a.firebaseapp.com",
  projectId: "netflixapp-2c04a",
  storageBucket: "netflixapp-2c04a.appspot.com",
  messagingSenderId: "37939138509",
  appId: "1:37939138509:web:29c6bfa7d1fe358ec97e84",
  measurementId: "G-03BR266MHS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const App = () => {
  const user = useSelector((state) => state.user.user);
  return (
    <Router>
      <Routes>
        <Route path="/" element={user !== null ? <Home /> : <Register />} />
        <Route path="/register" element={!user ? <Register /> : <Home />} />
        <Route path="/login" element={!user ? <Login /> : <Home />} />
        {user && (
          <>
            <Route path="/movies" element={<Home type="movie" />} />
            <Route path="/series" element={<Home type="series" />} />
            <Route path="/watch" element={<Watch />} />
            <Route path="/user/:id" element={<User />} />
            <Route path="/movie/:id" element={<Detail />} />
            <Route path="/mylist" element={<MyList />} />
            <Route path="/recharge" element={<Recharge />} />
            <Route path="/donepayment" element={<DonePayment />} />
            <Route path="/vouchers" element={<Voucher />} />
          </>
        )}
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Slide}
      />
      <Footer />
    </Router>
  );
};

export default App;
