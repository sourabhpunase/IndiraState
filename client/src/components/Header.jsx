import {FaSignInAlt,FaSearch,FaBiking,FaSign,FaAddressBook,FaHome} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'


export default function Header() {
  const {currentUser}=useSelector(state=>state.user)
  return (
    <header className='bg-slate-200 shadow-md'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-3 '>
  <Link to='/'>        
<h1 className='font-bold text-sm sm:text-xl flex flex-wrap' >
<span className='text-slate-400'>Indira </span>
<spa className="text-rose-500">Estates</spa>
</h1></Link>  
<form className='bg-slate-100 p-3 rounded-lg flex items-center w-24 sm:w-64' >
    <input type='text ' placeholder='Explore...'
    className='bg-transparent focus:outline-none cursor-text'
    />
   <FaSearch className='text-slate-600' />
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
