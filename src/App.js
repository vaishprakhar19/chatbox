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
      <h1>Chatbox</h1>
      <Home />
      {isLoggedIn ? (<button onClick={logout}>LOGOUT</button>) : (<button onClick={login}>LOGIN</button>)}
    </div>
  );
}

export default App;
