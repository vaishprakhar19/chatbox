import React, { useEffect, useRef, useState } from 'react';
import { addDoc, collection, getDocs, orderBy, query } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import "./styles.css";

export default function Home(props) {
  const [message, setMessage] = useState("");
  const [date, setDate] = useState("");
  const [messageList, setMessageList] = useState([]);
  const collectionRef = collection(db, "messages");

  const sendMessage = async () => {
    await addDoc(collectionRef, { message, author: auth.currentUser.displayName, date });
  }

  // const temp=[
  //   {message:"Hi",author:"Mahesh Dalla",date:"12pm"}
  // ]

  
  useEffect(() => {
    if (props.isLoggedIn) {
      const getMessages = async () => {
        const data = await getDocs(query(collectionRef,orderBy('date')));
        setMessageList(data.docs.map((item) => ({ ...item.data() })));
      };
      getMessages();
    }
  },[messageList,setMessageList]);

  return (
    <div>
      <div className='input-box'>
        <input id="input" type="textarea" onChange={(event) => {
          setMessage(event.target.value);
          setDate(new Date().toString());
        }}></input>
        <button id="send-button" onClick={sendMessage}>✈</button>
      </div>
      <div className='messages-container'>
      { 
        messageList.map((item) => {
        // temp.map((item) => {
          return <div className="message-box">
            <div className='author'>
              {item.author}:
              <br></br>
            </div>
            <div className='message-text'>
              {item.message}
            </div>
          </div>
        })
      }
      </div>
    </div>
  )
}
