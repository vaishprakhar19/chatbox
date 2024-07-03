import React from 'react'
import { auth, provider } from "../firebase-config"
import { signInWithPopup, signOut } from "firebase/auth"
import logo from "../resources/chatbox-logo.png"
import "./login.css"

const Login = ({ setIsLoggedIn }) => {
    let login;
    try {
        login = async () => {
            await signInWithPopup(auth, provider)
            setIsLoggedIn(true);
            localStorage.setItem("isLoggedIn", true);
        }
    } catch (err) { console.log(err); }
    return (
        <div className='login'>
            <div className='blur'></div>
            <div className='info'>
                <h1 className='heading' data-aos="fade-down" data-aos-duration="1500">Pikochat</h1>
                <p data-aos="fade-down" data-aos-duration="1500">A group chat for all, login, get along with other users all over the world, read messages, dive into ongoing topics, or suggest your own. Have fun...</p>
            <button className="button" data-aos="fade-up" data-aos-duration="1500" data-aos-offset="100" onClick={login}>Login</button>
            </div>
        </div>
    )
}

export default Login