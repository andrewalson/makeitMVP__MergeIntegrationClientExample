// import "./App.css";
import { useState } from "react";
import { initializeApp } from "firebase/app";

import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  getAuth,
} from "firebase/auth";

// Components
import LoginButton from "./components/LoginButton";
import EventsList from "./components/EventsList";
import UserProfile from "./components/UserProfile";
import UserContext from "./components/UserContext";
import LogoutButton from "./components/LogoutButton";
import ToDos from "./components/ToDos";
import Attachments from "./components/Attachments";

const provider = new GoogleAuthProvider();

const firebaseConfig = {
  apiKey: "AIzaSyCwJJoPdl4DFp6EdmEVoxaeK-jUtf_HIMQ",
  authDomain: "communiti-630fc.firebaseapp.com",
  projectId: "communiti-630fc",
  storageBucket: "communiti-630fc.appspot.com",
  messagingSenderId: "694468185447",
  appId: "1:694468185447:web:dc3fcfb023a75993b173c2",
  measurementId: "G-2HDXX6N821",
};
// // Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(false);
  console.log(user.accessToken);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setIsLoggedIn(true);
      setUser(user);
    } else {
      setIsLoggedIn(false);
      setUser(false);
    }
  });

  function handleLogin() {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="p-12 flex flex-col w-fit items-center">
      {isLoggedIn ? (
        <UserContext.Provider value={user}>
          <LogoutButton auth={auth} />
          <UserProfile />

          <div className="flex w-screen">
            {/* EventsList Fetches Data from the backend API setup by MergeIntegration */}
            <EventsList />

            {/* ToDos component example BYPASSES the API and performs CRUD operations direcly on the firestore */}
            <ToDos app={app} />
            <Attachments />
          </div>
        </UserContext.Provider>
      ) : (
        <div>
          {/* <ToDos app={app} /> */}
          <LoginButton handleLogin={handleLogin} />
        </div>
      )}
    </div>
  );
}

export default App;
