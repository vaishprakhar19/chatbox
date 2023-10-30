import { useState } from 'react';
import './App.css';
import Home from "./components/Home";
import { auth, provider } from "./firebase-config"
import { signInWithPopup, signOut } from "firebase/auth"

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn"));
  let login, logout;
  try {
    login = async () => {
      await signInWithPopup(auth, provider)
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", true);
    }

    logout = async () => {
      await signOut(auth);
      setIsLoggedIn(false);
      localStorage.clear();
    }
  }
  catch (err) { console.log(err); }

  return (
    <div className="App">
      <h1 id="heading">Chatbox</h1>
      {isLoggedIn ? (<button className='login-button' onClick={logout}>LOGOUT</button>) : (<button className="login-button" onClick={login}>LOGIN</button>)}
      <Home isLoggedIn={isLoggedIn}/>
    </div>
  );
}

export default App;
