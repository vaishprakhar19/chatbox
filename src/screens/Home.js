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
    message = document.getElementById("input").value;
    date = new Date().toString();
    await addDoc(collectionRef, { message, author: auth.currentUser.displayName, date });
    document.getElementById("input").value = ""; // Clear input after sending
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
        <input id="input" type="textarea"></input>
        <button id="send-button" onClick={sendMessage}>✈</button>
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
    </div>
  )
}
