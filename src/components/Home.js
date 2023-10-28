import React, { useEffect, useState } from 'react';
import {addDoc, collection, serverTimestamp} from "firebase/firestore";
import {auth, db} from "../firebase-config"

export default function Home() {
    const [message,setMessage]=useState("");

    const collectionRef=collection(db,"messages");

    const sendMessage= async ()=>{
        await addDoc(collectionRef,{message,author:auth.currentUser,time:serverTimestamp});
    }

  return (
    <div>
      I am Home
      <input type="textarea" onChange={(event)=>{setMessage(event.target.value)}}></input>
      <button onClick={sendMessage}>Send</button>
    </div>
  )
}
