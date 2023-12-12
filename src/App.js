import { BrowserRouter as Router,Routes,Route,Link } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import CreatePost from "./CreatePost";
import { useState } from "react";
import {signOut} from  "firebase/auth";
import {auth} from "./firebaseconfig";
import "./App.css"
function App() {
  const [isAuth,setisAuth]=useState(localStorage.getItem('isAuth'));
  const signUserOut=()=>{
    signOut(auth).then(()=>{
      localStorage.clear();
      setisAuth(false);
      window.location.pathname="/Login"
    })
  }
  return (
    <div className="App">
      <Router>
        <nav>
          <div className="logo">
            <img src="https://cdn-icons-png.flaticon.com/128/10026/10026285.png"/>           
          </div>
          <div className="links">
            <Link className="link" to="/">Home</Link>
            {isAuth?<Link className="link" to="/CreatePost">CreatePost</Link>:""}
            {!isAuth?<Link className="link" to="/Login">Login</Link>:<button onClick={()=>{signUserOut()}}>Logout</button>}
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Home isAuth={isAuth}/>}/>
          <Route path="/Login" element={<Login setisAuth={setisAuth}/>}/>
          <Route path="/CreatePost" element={<CreatePost isAuth={isAuth}/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
