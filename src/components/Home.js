import React, { useEffect, useState } from 'react';
import {addDoc, collection, getDocs} from "firebase/firestore";
import {auth, db} from "../firebase-config";
import "./styles.css";

export default function Home() {
    const [message,setMessage]=useState("");
    const [messageList,setMessageList]=useState([]);
    const collectionRef=collection(db,"messages");

    const date=new Date();
    const temp=[{message:"Hi",author:"Prakash",time:date},{message:"hello",author:"Dalla",time:date}];//TEMPORARY

    const sendMessage= async ()=>{
        await addDoc(collectionRef,{message,author:auth.currentUser.displayName,time:new Date()});
    }

    // useEffect(()=>{
    //     const getMessages= async ()=>{
    //         const data = await getDocs(collectionRef);
    //         setMessageList(data.docs.map((item)=>({...item.data()})));
    //     };
    //     getMessages();
    // });

    
  return (
    <div>
      <div className='input-box'>
      <input id="input" type="textarea" onChange={(event)=>{setMessage(event.target.value)}}></input>
      <button id="send-button" onClick={sendMessage}>✈️</button>
      </div>
      {
        // messageList.map((item)=>{ 
        temp.map((item)=>{                                         /*temporary stuff*/ 
            return <div className="message-box"> 
                    <div className='message-text'>
                        {item.message}
                    </div>
                    <div className='author'>
                        {item.author}
                    </div>
                </div>
            })
      }
    </div>
  )
}
