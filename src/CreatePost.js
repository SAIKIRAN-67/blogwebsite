import React, { useEffect, useState } from 'react'
import "./CreatePost.css"
import {addDoc,collection} from "firebase/firestore"
import {auth,db} from "./firebaseconfig"
import { useNavigate } from 'react-router-dom'
const CreatePost = ({isAuth}) => {
    const [title,setTitle]=useState("");
    const [text,setText]=useState("");
    const postCollectionRef=collection(db,'posts');
    let navigate=useNavigate();
    const addData=async()=>{
        if(title.Empty || text.Empty){
            alert("fill the fields");
            return false;
        }else{
            try{
                await addDoc(postCollectionRef,{
                    title:title,
                    text:text,
                    author:{
                        name:auth.currentUser.displayName,
                        id:auth.currentUser.uid
                    }
                })
                navigate("/");
                console.log(auth);
            }
            catch(error){
                console.error(error);
            }
        }
    }
    useEffect(()=>{
        if(!isAuth){
            navigate("/Login");
        }
    },[])
    
  return (
    <div className='Main'>
        <div className='main'>
            <h1>Create  a Post</h1>
            <h2>Title :</h2>
            <textarea className='title' rows={4} columns={50} onChange={(e)=>{setTitle(e.target.value)}}>

            </textarea>
            <h2>Description :</h2>
            <textarea className='text' rows={10} columns={50} onChange={(e)=>{setText(e.target.value)}}>
                
            </textarea>
            <button className='submitbutton' onClick={()=>{addData()}}>Submit</button>
        </div>
    </div>
  )
}

export default CreatePost
