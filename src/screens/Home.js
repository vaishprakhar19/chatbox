import React, { useEffect } from 'react'
import './home.css'
import { collection, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../firebase-config';
import { Link, useNavigate } from 'react-router-dom';
import { useAppState } from '../AppStateContext';
import logo from "../resources/chatbox-logo.png"

const Home = () => {
    const navigate= useNavigate();
    const { setActiveUsers, activeUsers, setChatUserName, setChatUserProfilePic, setIsGroupChat, setChatUID } = useAppState()
    useEffect(() => {
        const activeUsersRef = collection(db, "activeUsers");
        const unsubActiveUsers = onSnapshot(activeUsersRef, (snapshot) => {
            const activeUsersList = snapshot.docs.map(doc => doc.data());
            // setActiveUsers(activeUsersList.filter(user => user.status === 'online'));
            setActiveUsers(activeUsersList);
        });

        return () => {
            unsubActiveUsers();
        }; // Cleanup subscriptions on unmount  
    }, [setActiveUsers]);

    useEffect(() => {
        setIsGroupChat(false)
        setChatUserName('')
        setChatUserProfilePic('')
        // eslint-disable-next-line
    }, [])
    // console.log(activeUsers)
    const handleChatLink = (user) => {
        setChatUserProfilePic(user.photoUrl);
        setChatUserName(user.userName);
        setChatUID(user.uid);
        navigate("/chat")
    }
    const handleGroupChat = () => {
        setIsGroupChat(true);
    }
    return (
        <div className='home'>
            <Link className='chatbox' onClick={handleGroupChat} to="/chat">
                <img className='profile-img' alt='profile' src={logo}></img>
                <div className='chat-username'>Group Chat</div>
            </Link>
            {
                activeUsers.map((user, index) => (
                    user.userName !== auth.currentUser.displayName ?
                        <>
                            <div onClick={()=>{handleChatLink(user)}} key={index} className='chatbox' to="/chat">
                                <img className='profile-img' alt='profile' src={user.photoUrl ? user.photoUrl : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}></img>
                                <div className='chat-username'>{user.userName}</div>
                            </div>
                        </>
                        :
                        <></>
                ))
            }
        </div>
    )
}

export default Home