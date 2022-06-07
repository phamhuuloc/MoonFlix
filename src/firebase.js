import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDOl_u6ygeEJFsI4WwKIZAxeXucVYsnaCo",
//   authDomain: "admin-34b73.firebaseapp.com",
//   projectId: "admin-34b73",
//   storageBucket: "admin-34b73.appspot.com",
//   messagingSenderId: "15167484250",
//   appId: "1:15167484250:web:d584cd3bd4a87277580363",
// };
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
const init = initializeApp(firebaseConfig);
const storage = getStorage(init);
export default storage;
