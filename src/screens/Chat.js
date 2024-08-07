import React, { useEffect, useRef } from 'react';
import { addDoc, and, collection, onSnapshot, or, orderBy, query, where } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import { Timestamp } from "firebase/firestore";
import "./chat.css";
import { useAppState } from '../AppStateContext';

export default function Chat() {
  const { messageList, setMessageList, isLoggedIn, loginTime, activeUsers, setActiveUsers, setShowActiveUsers,chatUserProfilePic, showActiveUsers, isGroupChat, chatUID } = useAppState()
  const messagesEndRef = useRef(null);
  // console.log(messageList);

  const sendMessage = async () => {
    const collectionRef = collection(db, "messages");
    const message = document.getElementById("messageInput").value;
    const date = Timestamp.now();
    await addDoc(collectionRef, { message, author: auth.currentUser.displayName, date, messageUID: auth.currentUser.uid, isGroupChatMessage: isGroupChat, recepient: (isGroupChat ? null : chatUID) });
    document.getElementById("messageInput").value = ""; // Clear input after sending
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  }
  console.log(chatUID)
  console.log(chatUserProfilePic)
  useEffect(() => {
    if (isLoggedIn && loginTime) {
      const collectionRef = collection(db, "messages");
      let q = ''
      if (isGroupChat) { q = query(collectionRef, orderBy("date"), where("date", ">", loginTime), where('isGroupChatMessage', '==', true)); }// Filter messages based on login time
      else {
        q = query(collectionRef, orderBy('date'),
          and(
            where('isGroupChatMessage', '==', false),
            or(
              and(
                where('messageUID', '==', auth.currentUser.uid), where('recepient', '==', chatUID)
              ),
              and(
                where('messageUID', '==', chatUID), where('recepient', '==', auth.currentUser.uid)
              )
            )
          )
        )
      }
      const unsubMessages = onSnapshot(q, (snapshot) => {
        setMessageList(snapshot.docs.map((item) => ({ ...item.data(), id: item.id })));
        scrollToBottom();
      });
      const activeUsersRef = collection(db, "activeUsers");
      const unsubActiveUsers = onSnapshot(activeUsersRef, (snapshot) => {
        const activeUsersList = snapshot.docs.map(doc => doc.data());
        setActiveUsers(activeUsersList.filter(user => user.status === 'online'));
      });

      return () => {
        unsubMessages();
        unsubActiveUsers();
      }; // Cleanup subscriptions on unmount
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messageList]);

  return (
    <div className='home'>
      <div className={`${showActiveUsers ? 'home-blur' : ''}`}></div>
      {showActiveUsers && (
        <div className='active-users-list'>
          <button className="close-button" onClick={() => setShowActiveUsers(false)}>X</button>
          <h3>Active Users</h3>
          <ul>
            {activeUsers.map((user, index) => (
              <li key={index}>{user.userName}</li>
            ))}
          </ul>
        </div>
      )}
      <div className='input-box'>
        <div className='message-input'>
          {/* <div class="fileUploadWrapper">
            <label for="file">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 337 337">
                <circle
                  strokeWidth="20"
                  stroke="#6c6c6c"
                  fill="none"
                  r="158.5"
                  cy="168.5"
                  cx="168.5"
                ></circle>
                <path
                  strokeLinecap="round"
                  strokeWidth="25"
                  stroke="#6c6c6c"
                  d="M167.759 79V259"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeWidth="25"
                  stroke="#6c6c6c"
                  d="M79 167.138H259"
                ></path>
              </svg>
              <span class="tooltip">Add an image</span>
            </label>
            <input type="file" id="file" name="file" />
          </div> */}
          <input required="" placeholder="Message..." type="text" id="messageInput" autoComplete='off'/>
          <button id="sendButton" onClick={sendMessage}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 664 663">
              <path
                fill="none"
                d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"
              ></path>
              <path
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="33.67"
                stroke="#6c6c6c"
                d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      <div className='messages-container'>
        {
          messageList.map((item) => {
            const isCurrentUser = item.author === auth.currentUser.displayName;
            const isSystemMessage = item.system;
            return (
              <div key={item.id} className={`message-box ${isCurrentUser ? 'current-user' : ''} ${isSystemMessage ? 'system-message' : ''}`}>
                <div className='author'>
                  {item.author}:
                  <br />
                </div>
                <div className='message-text'>
                  {item.message}
                </div>
              </div>
            )
          })
        }
        <div ref={messagesEndRef}></div>
      </div>
    </div >
  )
}
