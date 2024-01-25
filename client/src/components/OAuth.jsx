import React from 'react'
import './oath.css'
import {GoogleAuthProvider, getAuth, signInWithPopup, signInWithRedirect} from 'firebase/auth'
import { app } from '../firebase'
import { useDispatch } from 'react-redux'
import { signInSucess } from '../redux/user/userSlice'
import { useNavigate } from 'react-router-dom'
export default function OAuth() {

const dispatch=useDispatch()
const navigate=useNavigate();

    const handleGoogleClick=async()=>{
        try{
    const provider=new GoogleAuthProvider();

    const auth=getAuth(app)
    const result=await signInWithPopup(auth,provider)
const res=await fetch ('/api/auth/google',{
    method:'POST',
    headers:{
        'Content-Type':'application/json',

    },
    body:JSON.stringify({name:result.user.displayName,email:result.user.email,photo:result.user.photoURL})
})

const data= await res.json();
dispatch(signInSucess(data))
navigate('/')
}
        catch(error){

            console.log('could not connect due to',error)
        }
    }

  return (
    <div>

<button onClick={handleGoogleClick} type='button' className='google-button'>Continue With Google</button>
    </div>
  )
}
