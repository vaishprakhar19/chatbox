import React from 'react';
import { auth, db, provider } from "../firebase-config";
import { signInWithPopup } from "firebase/auth";
import { Timestamp, addDoc, collection } from 'firebase/firestore';
import "./login.css";

const Login = ({ setIsLoggedIn, setLoginTime }) => {
  const login = async () => {
    try {
      await signInWithPopup(auth, provider);
      const currentLoginTime = Timestamp.now();
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", true);
      setLoginTime(currentLoginTime);
      localStorage.setItem('loginTime', currentLoginTime.toDate().toString());

      // Emit a message indicating the user has joined
      const collectionRef = collection(db, "messages");
      await addDoc(collectionRef, {
        message: `${auth.currentUser.displayName} has joined the chat.`,
        system: true, // Flag to indicate system message
        date: currentLoginTime
      });

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='login'>
      <div className='blur'></div>
      <div className='info'>
        <h1 className='heading' data-aos="fade-down" data-aos-duration="1500">Pikochat</h1>
        <p data-aos="fade-down" data-aos-duration="1500">A group chat for all, login, get along with other users all over the world, read messages, dive into ongoing topics, or suggest your own. Have fun...</p>
        <button className="button" data-aos="fade-up" data-aos-duration="1500" data-aos-offset="100" onClick={login}>Login</button>
      </div>
    </div>
  );
};

export default Login;
