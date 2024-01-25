import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './profile.css'
import { Link } from 'react-router-dom'
import {getDownloadURL, getStorage,ref, uploadBytesResumable} from 'firebase/storage'
import { app } from '../firebase'
import { updateUserStart,updateUserSuccess,updateUserFailure, deleteUserStart, deleteUserFailure, deleteUserSuccess, logoutUserFailure, logoutUserStart, logoutUserSuccess } from '../redux/user/userSlice'
export default function Profile() {
 const {currentUser,loading,error}=useSelector((state)=>state.user)
 const fileref=useRef(null)
 const [file,setFile]=useState(undefined);
 const [fileperc,setFileperc]=useState(0)
const [fileError,setFileError]=useState(false)
const [imageData,setImageData]=useState({})
const [updateSuccess,SetUpdateSuccess]=useState(false);

const dispatch=useDispatch();

useEffect(()=>{
  if(file){
    handleFileUpload(file)
  }
 },[file]);


 const handleFileUpload=(file)=>{
  const storage=getStorage(app);
  const fileName= new Date().getTime()+file.name
const storageRef=ref(storage,fileName) 
const uploadTask=uploadBytesResumable(storageRef,file);

uploadTask.on('state_changed',
(snapshot)=>{
  const progress=(snapshot.bytesTransferred/
  snapshot.totalBytes)*100;
  setFileperc(Math.round(progress))
},
(error)=>{
  setFileError(true)
},
()=>{
  getDownloadURL(uploadTask.snapshot.ref).then(
    (downloadUrl)=>
setImageData({...imageData,avatar:downloadUrl})
          )
  }
)


}
const handleChange=(e)=>{
  setImageData({...imageData,[e.target.id]:e.target.value});

}
const handleSubmit= async(e)=>{
  e.preventDefault();

  try{
dispatch(updateUserStart());

const res=await fetch (`/api/user/update/${currentUser._id}`,{

  method:'POST',
  headers: {
    'Content-Type':'application/json',
  },
  body:JSON.stringify(imageData),

});
const data= await res.json();
if(data.success===false){
  dispatch(updateUserFailure(data.message))
  return;
}
dispatch(updateUserSuccess(data));
SetUpdateSuccess(true);
  }
  catch(error){
dispatch(updateUserFailure(error.message))
  }
}
const handleDelete= async(e)=>{
e.preventDefault();
try{
  dispatch(deleteUserStart());
  const res=await fetch(`/api/user/delete/${currentUser._id}`,{
    method:'DELETE',
  
  });
  const data= await res.json();
  if(data.success===false){
    dispatch(deleteUserFailure(data.message));
    return;
  };
  dispatch(deleteUserSuccess(data));


}
catch(error){
dispatch(deleteUserFailure(error.message))
}
}
const handleSignout= async ()=>{
try{
 dispatch( logoutUserStart());

  const res= await fetch('/api/auth/signout');
  const data= await res.json();
  if(data.success===false){
   dispatch( logoutUserFailure(data.message));
   return;
  }
  dispatch(logoutUserSuccess(data))

}
catch(error){
dispatch(logoutUserFailure(error.message))
}
}
  return (
    <div className='p-3 max-w-lg mx-auto'>

      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

<input onChange={(e)=>setFile(e.target.files[0])} type='file' ref={fileref} hidden accept='image/*' />


<img onClick={()=>fileref.current.click()} src={imageData.avatar||currentUser.avatar} alt='photo'
className='rounded-full h-24 w-24 object-cover first-letter:cursor-pointer
 self-center mt-2 cursor-grabbing'
/>
<p className='text-sm self-center'>

  {fileError?(<span className='text-rose-900'>Erro While Uploading(image must be less than 2 mb)</span>):
  fileperc>0&&fileperc<100?
(
  <span className='text-green-900'>{`uploading ${fileperc}%`}</span>
) :
fileperc ===100?(
  <span className='text-emerald-800'>Succefully updated</span>
):
""
}
</p>
<input type='text' placeholder='username'
defaultValue={currentUser.username}
className='border p-3 rounded-lg' id='username'
onChange={handleChange}
/>
<input type='email' placeholder='email'
defaultValue={currentUser.email}
className='border p-3 rounded-lg'id='email' 
onChange={handleChange}
/>
<input type='password' placeholder='password'
className='border p-3 rounded-lg' 
onChange={handleChange}
/>
<button disabled={loading} className='update-button'>{loading?'Loading..':'Update'}</button>
<Link to='/create-listing' className='listing-btn'>
Create Listing

</Link>

    </form>
  <div className='flex justify-between mt-5'>
<span className='text-red-700 cursor-pointer' onClick={handleDelete}> Delete Account</span>
<span className='text-red-700 cursor-pointer' onClick={handleSignout}> Sign out</span>

  </div>
  <p className='text-red-600'>{error?error:''}</p>
    <p className='text-green-600'> {updateSuccess?'User is updated successfully':''} </p>

    </div>
  )
}
