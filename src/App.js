import { useEffect, useState } from 'react';
import './App.css';
import Home from "./screens/Home";
import Navbar from "./components/Navbar";
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './screens/Login';
import AOS from "aos";
import "aos/dist/aos.css";
import { auth } from './firebase-config';
import { Comment } from 'react-loader-spinner';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", true);
      } else {
        setIsLoggedIn(false);
        localStorage.removeItem("isLoggedIn");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <Comment
    className="loader"
      visible={true}
      height="80"
      width="80"
      ariaLabel="comment-loading"
      wrapperStyle={{}}
      wrapperClass="comment-wrapper"
      color="#ffd752"
      backgroundColor="#0068a4"
    />;
  }

  return (
    <div className="App">
      {isLoggedIn && <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}
      <Router>
        <Routes>
          {isLoggedIn ? (
            <>
              <Route path='/home' element={<Home isLoggedIn={isLoggedIn} />} />
              <Route path="*" element={<Navigate to="/home" />} />
            </>
          ) : (
            <>
              <Route path='/' element={<Login setIsLoggedIn={setIsLoggedIn} />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
