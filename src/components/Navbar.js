import React from 'react';
import "./navbar.css";
import { auth } from "../firebase-config"
import { signOut } from "firebase/auth"
import logo from "../resources/chatbox-logo.png"
function Navbar({ setIsLoggedIn, isLoggedIn }) {
    // const [showNavLinks, setShowNavLinks] = useState(false);

    // const toggleNavLinks = () => {
    //     setShowNavLinks(!showNavLinks);
    // };
    let logout;
    try {
        logout = async () => {
            await signOut(auth);
            setIsLoggedIn(false);
            localStorage.clear();
        }
    }
    catch (err) { console.log(err); }

    const handleImageError = (e) => {
        e.target.src = {logo};
      };
      
    return (
        <div className='navbar'>
            <div className="logo">
                <img src={auth.currentUser.photoURL} alt="" onError={handleImageError}></img>
                <p>{auth.currentUser.displayName}</p>
            </div>
                <button className='button' onClick={logout}>Logout</button>
            {/* <div className='toggle-button' onClick={toggleNavLinks}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#ffffff" d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" /></svg>
            </div>
            <div className={`navlinks ${showNavLinks ? 'show' : ''}`}>
                {console.log(isLoggedIn)}
                <button className='button' onClick={logout}>Logout</button>
            </div> */}
        </div>
    );
}

export default Navbar;