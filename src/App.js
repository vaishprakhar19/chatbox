import { useEffect } from 'react';
import './App.css';
import Chat from "./screens/Chat";
import Navbar from "./components/Navbar";
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './screens/Login';
import Home from './screens/Home';
import AOS from "aos";
import "aos/dist/aos.css";
import { auth } from './firebase-config';
import { Comment } from 'react-loader-spinner';
import { useAppState } from './AppStateContext';
function App() {
  const {
    isLoggedIn,
    setIsLoggedIn,
    setLoading,
    loading
  } = useAppState();
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
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <div className='loader-container'>
      <Comment
        visible={true}
        height="200"
        width="200"
        ariaLabel="comment-loading"
        wrapperClass="comment-wrapper"
        color="#ffd752"
        backgroundColor="#0068a4"
      />
    </div>
  }

  return (
    <div className="App">
      {isLoggedIn && <Navbar />}
      <Router>
        <Routes>
          {isLoggedIn ? (
            <>
              <Route path='/home' element={<Home />} />
              <Route path='/chat' element={<Chat />} />
              <Route path="*" element={<Navigate to="/home" />} />
            </>
          ) : (
            <>
              <Route path='/' element={<Login />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
