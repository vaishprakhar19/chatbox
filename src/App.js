import { useState } from 'react';
import './App.css';
import Home from "./components/Home";
import {auth,provider} from "./firebase-config"
import {signInWithPopup, signOut} from "firebase/auth"

function App() {

  const [isLoggedIn,setIsLoggedIn]=useState(localStorage.getItem("isLoggedIn"));
  const login=async ()=>{
    await signInWithPopup(auth,provider)
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn","true");
  }

  const logout = async ()=>{
    await signOut(auth);
    setIsLoggedIn(false);
    localStorage.setItem("isLoggedIn",false);
  }

  return (
    <div className="App">
      <h1>Chatbox</h1>
      <Home/>
      <button hidden={isLoggedIn} onClick={login}>LOGIN</button>
      <button hidden={!isLoggedIn} onClick={logout}>LOGOUT</button>
    </div>
  );
}

export default App;
