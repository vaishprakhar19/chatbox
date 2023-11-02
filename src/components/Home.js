import React, { useEffect, useRef, useState } from 'react';
import { addDoc, collection, getDocs, onSnapshot, orderBy, query } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import "./styles.css";

export default function Home(props) {
  let message = "";
  let date="";
  const [messageList, setMessageList] = useState([]);
  const collectionRef = collection(db, "messages");

  const sendMessage = async () => {
    message=document.getElementById("input").value;
    date=new Date().toString();
    await addDoc(collectionRef, { message, author: auth.currentUser.displayName, date });
  }

  // const temp=[
  //   {message:"Hi",author:"Mahesh Dalla",date:"12pm"}
  // ]

  
  useEffect(() => {
    if (props.isLoggedIn) {
      const unsub= onSnapshot(query(collectionRef,orderBy("date")),(snapshot)=>{
        setMessageList(snapshot.docs.map((item)=>({...item.data(),id:item.id})))
      })
      // const data = await getDocs(query(collectionRef,orderBy('date')));
      // setMessageList(data.docs.map((item) => ({ ...item.data() })));
      return unsub;
    }
    },[]);


  return (
    <div>
      <div className='input-box'>
        <input id="input" type="textarea"></input>
        <button id="send-button" onClick={sendMessage}>✈</button>
      </div>
      <div className='messages-container'>
      { 
        messageList.map((item) => {
        // temp.map((item) => {
          return <div key={item.id} className="message-box">
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
