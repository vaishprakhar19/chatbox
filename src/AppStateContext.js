import { Timestamp } from 'firebase/firestore';
import React, { createContext, useContext, useState } from 'react';

// Create a context to hold all the states
const AppStateContext = createContext();

// Custom hook to access the states from any component
export const useAppState = () => useContext(AppStateContext);

export const AppStateProvider = ({ children }) => {
    const [messageList, setMessageList] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn"));
    const [loading, setLoading] = useState(true);
    const [showActiveUsers, setShowActiveUsers] = useState(false);
    const [chatUserProfilePic, setChatUserProfilePic] = useState('');
    const [chatUserName, setChatUserName] = useState('');
    const [chatUID, setChatUID] = useState('');
    const [isGroupChat, setIsGroupChat] = useState(false);
    const [activeUsers, setActiveUsers] = useState([]);
    const [loginTime, setLoginTime] = useState(localStorage.getItem("loginTime") ? Timestamp.fromDate(new Date(localStorage.getItem("loginTime"))) : null);

    return (
        <AppStateContext.Provider value={{ chatUID, setChatUID, chatUserName, setChatUserName, chatUserProfilePic, setChatUserProfilePic, messageList, setMessageList, isLoggedIn, setIsLoggedIn, loading, setLoading, showActiveUsers, setShowActiveUsers, isGroupChat, setIsGroupChat, activeUsers, setActiveUsers, loginTime, setLoginTime }}>
            {children}
        </AppStateContext.Provider>
    );
};