import React from 'react';
import "./navbar.css";
import { auth, db } from "../firebase-config"
import { signOut } from "firebase/auth"
import { Timestamp, addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import logo from "../resources/chatbox-logo.png"

function Navbar({ setIsLoggedIn, activeUsers, isLoggedIn, setShowActiveUsers, showActiveUsers }) {
    // const [showNavLinks, setShowNavLinks] = useState(false);

    // const toggleNavLinks = () => {
    //     setShowNavLinks(!showNavLinks);
    // };

    const logout = async () => {
        try {
            const currentLoginTime = Timestamp.now();
            const collectionRef = collection(db, "messages");
            await addDoc(collectionRef, {
                message: `${auth.currentUser.displayName} has left the chat.`,
                system: true, // Flag to indicate system message
                date: currentLoginTime
            });

            const user = auth.currentUser;
            const userRef = doc(db, 'activeUsers', user.uid);

            // Update user status to offline
            await updateDoc(userRef, {
                status: 'offline'
            });

            await signOut(auth);
            setIsLoggedIn(false);
            localStorage.clear();
        } catch (err) {
            console.log(err);
        }
    };

    const handleImageError = (e) => {
        e.target.src = logo; // Assign logo directly, assuming logo is a valid URL or imported image
    };

    const handleToggleActiveUsers = () => {
        setShowActiveUsers(prevShowActiveUsers => !prevShowActiveUsers);
    };

    return (
        <div className='navbar'>
            <div className="logo">
                <img src={auth.currentUser.photoURL} alt="" onError={handleImageError} />
                <p>{auth.currentUser.displayName}</p>
            </div>
            {/* <div className='toggle-button' onClick={toggleNavLinks}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#ffffff" d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" /></svg>
            </div> */}
            {/* <div className={`navlinks ${showNavLinks ? 'show' : ''}`}> */}
            <div className="nav-buttons">
            <button className="Logout-Btn" onClick={logout}>
            <div className="sign"><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg></div>
            <div className="text">Logout</div>
          </button>
                <button className='button' onClick={handleToggleActiveUsers}>Active: {activeUsers.length}</button>
            </div>
        </div>
    );
}

export default Navbar;
