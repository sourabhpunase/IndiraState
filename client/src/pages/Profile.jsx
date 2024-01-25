import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import './profile.css'
import {getDownloadURL, getStorage,ref, uploadBytesResumable} from 'firebase/storage'
import { app } from '../firebase'
export default function Profile() {
 const {currentUser}=useSelector((state)=>state.user)
 const fileref=useRef(null)
 const [file,setFile]=useState(undefined);
 const [fileperc,setFileperc]=useState(0)
const [fileError,setFileError]=useState(false)
const [imageData,setImageData]=useState({})

useEffect(()=>{
  if(file){
    handleFileUpload(file)
  }
 },[file])

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
  return (
    <div className='p-3 max-w-lg mx-auto'>

      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
    <form className='flex flex-col gap-4'>

<input onChange={(e)=>setFile(e.target.files[0])} type='file' ref={fileref} hidden accept='image/*' />


<img onClick={()=>fileref.current.click()} src={imageData.avatar||currentUser.avatar} alt='photo'
className='rounded-full h-24 w-24 object-cover first-letter:cursor-pointer
 self-center mt-2 cursor-alias'
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
className='border p-3 rounded-lg' id='username' />
<input type='email' placeholder='email'
className='border p-3 rounded-lg'id='email' />
<input type='password' placeholder='password'
className='border p-3 rounded-lg' />
<button className='update-button'>Update</button>


    </form>
  <div className='flex justify-between mt-5'>
<span className='text-red-700 cursor-pointer'> Delete Account</span>
<span className='text-red-700 cursor-pointer'> Sign out</span>

  </div>
    
    </div>
  )
}