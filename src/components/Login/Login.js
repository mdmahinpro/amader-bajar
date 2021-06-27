import firebase from "firebase/app";
import "firebase/auth";
import React, { useContext, useState } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import { UserContext } from "../../App";
import firebaseConfig from '../../firebase.config';
firebase.initializeApp(firebaseConfig)

export default function Login() {

  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
    const [user, setUser] = useState({
        isSignedIn:false,
        name:'',
        email:'',
        password:'',
    })
    const [newUser,setNewUser]=useState(false)

    const handleGoogleLogin=()=>{
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth()
      .signInWithPopup(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;

        var token = credential.accessToken;
        var user = result.user;
        setUser(user);
      }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        // ...
      });
    }

    const handleSubmit=(e)=>{
        console.log(user.email,user.password);
        if(newUser && user.email && user.password ){
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then((userCredential) => {
              // Signed in 
              var user = userCredential.user;
              console.log("account created Successfully");
              updateUserName(user.name)
              // ...
            })
            .catch((error) => {
              var errorCode = error.code;
              var errorMessage = error.message;
              console.log(errorMessage);
              // ..
            });
        }
        if(!newUser && user.email && user.password){
          firebase.auth().signInWithEmailAndPassword(user.email, user.password)
          .then(res => {
            // Signed in
            const newUserInfo={...user}
            setUser(newUserInfo)
            setLoggedInUser(newUserInfo)
            history.replace(from)
            console.log("signed in successfully");
            // ...
          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage);
          });
                }
                e.preventDefault()
            }

    const handleBlur=(e)=>{
        let isFormValid=true;
        if(e.target.name==="email"){
             isFormValid=/\S+@\S+\.\S+/.test(e.target.value);
        }
        if(e.target.name==='password'){
            isFormValid=e.target.value.length>=6;
        }
        if(isFormValid){
            const newUserInfo={...user}
            newUserInfo[e.target.name]=e.target.value;
            setUser(newUserInfo)
            
        }
    }

    const updateUserName=(name)=>{
        const user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: name,
          }).then(() => {
            // Update successful
            // ...
          }).catch((error) => {
            // An error occurred
            // ...
          }); 
    }

    const [loggedInUser,setLoggedInUser]=useContext(UserContext)
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="checkbox" onChange={()=>setNewUser(!newUser)} name="newUser" id="" />
                <label htmlFor="newUser">New User Signup</label><br />
                {newUser && <input type="text" name="name" placeholder="name" onBlur={handleBlur} /> } <br />
                <input type="email" onBlur={handleBlur} name="email" placeholder="input your name" required />
                <br />
                <br />
                <input type="password" onBlur={handleBlur} name="password" placeholder="input your password" required /> <br />
                {!newUser?<input type="submit" value="Submit" />: <input type="submit" value="Sign Up " /> }
            </form>

            <button onClick={handleGoogleLogin}>Login With Google</button>
        </div>
    )
}
