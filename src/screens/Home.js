import React, { useEffect, useRef, useState } from 'react';
import { addDoc, collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import "./home.css";

export default function Home({ isLoggedIn }) {
  let message = "";
  let date = "";
  const [messageList, setMessageList] = useState([]);
  const collectionRef = collection(db, "messages");
  const messagesEndRef = useRef(null);

  const sendMessage = async () => {
    message = document.getElementById("messageInput").value;
    date = new Date().toString();
    await addDoc(collectionRef, { message, author: auth.currentUser.displayName, date });
    document.getElementById("messageInput").value = ""; // Clear input after sending
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    if (isLoggedIn) {
      const unsub = onSnapshot(query(collectionRef, orderBy("date")), (snapshot) => {
        setMessageList(snapshot.docs.map((item) => ({ ...item.data(), id: item.id })));
        // scrollToBottom();
      });
      return () => unsub(); // Cleanup subscription on unmount
    }
  }, [isLoggedIn]);

  useEffect(() => {
    scrollToBottom();
  }, [messageList]);

  return (
    <div className='home'>
      <div className='input-box'>
        <div className='message-input'>
          {/* <div class="fileUploadWrapper">
            <label for="file">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 337 337">
                <circle
                  stroke-width="20"
                  stroke="#6c6c6c"
                  fill="none"
                  r="158.5"
                  cy="168.5"
                  cx="168.5"
                ></circle>
                <path
                  stroke-linecap="round"
                  stroke-width="25"
                  stroke="#6c6c6c"
                  d="M167.759 79V259"
                ></path>
                <path
                  stroke-linecap="round"
                  stroke-width="25"
                  stroke="#6c6c6c"
                  d="M79 167.138H259"
                ></path>
              </svg>
              <span class="tooltip">Add an image</span>
            </label>
            <input type="file" id="file" name="file" />
          </div> */}
          <input required="" placeholder="Message..." type="text" id="messageInput" />
          <button id="sendButton" onClick={sendMessage}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 664 663">
              <path
                fill="none"
                d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"
              ></path>
              <path
                stroke-linejoin="round"
                stroke-linecap="round"
                stroke-width="33.67"
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
            return (
              <div key={item.id} className={`message-box ${isCurrentUser ? 'current-user' : ''}`}>
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
