import { useState } from 'react';
import './App.css';
import Home from "./components/Home";
import {auth,provider} from "./firebase-config"
import {signInWithPopup} from "firebase/auth"

function App() {

  const [isLoggedIn,setIsLoggedIn]=useState(false);
  const login=async ()=>{
    await signInWithPopup(auth,provider)
      setIsLoggedIn(true);
      localStorage.setItem(isLoggedIn,"true");
  }

  return (
    <div className="App">
      <h1>Chatbox</h1>
      <Home/>
      {isLoggedIn ? <button onClick={login}>LOGIN</button> :<button></button> }
    </div>
  );
}

export default App;
