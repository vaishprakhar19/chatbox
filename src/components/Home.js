import React, { useEffect, useState } from 'react';
import {addDoc, collection, getDocs} from "firebase/firestore";
import {auth, db} from "../firebase-config";
import "./styles.css";

export default function Home(props) {
    const [message,setMessage]=useState("");
    const [messageList,setMessageList]=useState([]);
    const collectionRef=collection(db,"messages");

    // const temp=[{message:"Hi",author:"Prakash",time:date},{message:"hello",author:"Dalla"];//TEMPORARY

    const sendMessage= async ()=>{
        await addDoc(collectionRef,{message,author:auth.currentUser.displayName});
    }

    useEffect(()=>{

      if(props.isLoggedIn){
        const getMessages= async ()=>{
            const data = await getDocs(collectionRef);
            setMessageList(data.docs.map((item)=>({...item.data()})));
        };
        getMessages();
      }
    });

    
  return (
    <div>
      <div className='input-box'>
      <input id="input" type="textarea" onChange={(event)=>{setMessage(event.target.value)}}></input>
      <button id="send-button" onClick={sendMessage}>✈</button>
      </div>
      {
        // temp.map((item)=>{                                         /*temporary stuff*/ 
        messageList.map((item)=>{ 
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
  )
}
