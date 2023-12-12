import React from 'react'
import { useState,useEffect } from 'react'
import {getDocs,collection,deleteDoc,doc} from "firebase/firestore"
import {auth,db} from "./firebaseconfig";
import { useNavigate } from 'react-router-dom';
import "./Home.css"
const Home = ({isAuth}) => {
  let navigate=useNavigate();
  const [posts,setPosts]=useState([]);
  const [loading,setLoading]=useState(false);
  const postsCollectionRef=collection(db,'posts');
  const getPosts=async()=>{
    setLoading(false);
    const data=await getDocs(postsCollectionRef);
    setPosts(data.docs.map((doc)=>({...doc.data(),id:doc.id})));
    setLoading(false);
  }
  useEffect(()=>{
    getPosts();
  },[])
  const deletePost=async(id)=>{
    const postDoc=doc(db,'posts',id);
    await deleteDoc(postDoc);
    getPosts();
  }
  if(loading){
    return(
      <h3>loading</h3>
    )
  }
  return (
    <div className='homemain'>
      <div className='back'>
        <h3>
        Dive into the boundless world of thoughts and perspectives as you step into our blogosphere—a space where every keystroke weaves narratives, and every click opens doors to new realms of insight and inspiration.
        </h3>
        <button onClick={()=>{navigate("/CreatePost")}}> Create Blog</button>
      </div>
      <center><h1 className='blogstitle'>Blogs</h1></center>
      <div className='posts'>
        {posts.map((eachitem)=>{
          return(
            <div key={eachitem.id} className='post'>
              {isAuth && eachitem.author.id===auth.currentUser.uid &&  <button className='delete' onClick={()=>{console.log("hi");deletePost(eachitem.id)}}>delete</button>}
              <h1>{eachitem.title}</h1>
              <p>{eachitem.text}</p>
              <h3>by-{eachitem.author.name}</h3>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Home
