import {FaSignInAlt,FaSearch,FaBiking,FaSign,FaAddressBook,FaHome} from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'


export default function Header() {
  const {currentUser}=useSelector(state=>state.user)
 const [searchTerm,setSearchTerm]=useState('');
const navigate=useNavigate();


 const handleChange=(e)=>{
  setSearchTerm(e.target.value);

 }
const handleSubmit=(e)=>{
  e.preventDefault();
  const urlParams= new URLSearchParams(window.location.search);
urlParams.set('searchTerm',searchTerm);
const searchQuery=urlParams.toString();
navigate(`/search?${searchQuery}`);




};
useEffect(()=>{
  const urlParams= new URLSearchParams(window.location.search);
  const searchTermFromUrl=urlParams.get('searchTerm');

  if(searchTermFromUrl){
    setSearchTerm(searchTermFromUrl)
  }
},[location.search])

  return (
    <header className='bg-slate-200 shadow-md'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-3 '>
  <Link to='/'>        
<h1 className='font-bold text-sm sm:text-xl flex flex-wrap' >
<span className='text-slate-400'>Indira </span>
<spa className="text-rose-500">Estates</spa>
</h1></Link>  
<form 
onSubmit={handleSubmit}
className='bg-slate-100 p-3 rounded-lg flex items-center w-24 sm:w-64' >
    <input type='text ' placeholder='Explore...'
    className='bg-transparent focus:outline-none cursor-text'
   value={searchTerm}
   onChange={handleChange}
   
   />
   <button>



   <FaSearch className='text-slate-600' />
   </button>
</form>

<ul className='flex gap-9'>
    <Link to='/'>

<li className='hidden sm:inline text-zinc-950 hover:underline'><FaHome className='text-red-500 ml-3 sm:ml-1  mb-0 sm:mb-1 w-15 sm:w-8 h-8 sm:w-15 '/>Home</li>
</Link>
<Link to='/about'>
<li  className=' text-zinc-950 hover:underline'><FaAddressBook className='text- ml-3 sm:ml-1 mb-0 sm:mb-1 w-15 sm:w-8 h-8 sm:w-15 '/>About</li>
</Link>

<Link to='/profile'>
{currentUser?(
  <img className='rounded-full h-12 w-12 object-cover' src={currentUser.avatar} alt='profile'/>
):(
  <li  className=' text-zinc-950 hover:underline' ><FaSignInAlt className='text-stone-500 ml-3 sm:ml-1 mb-0 sm:mb-1 w-15 sm:w-8 h-8 sm:w-15 '/>Sign in</li>
  )}


</Link>
</ul>
</div>
    </header>
  )
}