import React, { useEffect, useState } from 'react';
import {addDoc, collection, getDocs} from "firebase/firestore";
import {auth, db} from "../firebase-config";

export default function Home() {
    const [message,setMessage]=useState("");
    const [messageList,setMessageList]=useState([]);
    const collectionRef=collection(db,"messages");

    const date=new Date();
    const temp=[{message:"Hi",author:"Prakash",time:date},{message:"hello",author:"Dalla",time:date}];
    // console.log(messageList);

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
      <input type="textarea" onChange={(event)=>{setMessage(event.target.value)}}></input>
      <button onClick={sendMessage}>Send</button>
      {
        messageList.map((item)=>{ 
            return <div> 
                    <div className='message'>
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
