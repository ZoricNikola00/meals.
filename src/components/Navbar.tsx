import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import {useNavigate, Link} from 'react-router-dom'
import {FaSearch,FaBars,FaMoon,FaSun} from 'react-icons/fa'
import { useGlobalContext } from '../context'

const Navbar = () => {
    const [query,setQuery]=useState('')
    const nav=useNavigate()
    const [showMenu,setShowMenu]=useState(false)
    const {user,logOut,theme,changeTheme,shadow}=useGlobalContext()
    const navigate=useNavigate()
    
    const handleSubmit=(e:React.FormEvent)=>{
        e.preventDefault()
        setShowMenu(false)
        nav(`/list/${query}`)
    }
    const handleLogout=async(e:React.FormEvent)=>{
        try{
            await logOut()
            navigate('/')            
        }catch(err){console.log(err)}
    }
  return (
    <nav className={`w-[90%] md:w-[85%] lg:w-[75%] mx-auto shadow-${shadow} shadow-lg  p-4 px-8 rounded-lg my-4 flex items-center justify-between`}>
        <Link className='z-40' to='/'><h1 className='text-4xl font-bold uppercase '>Meals.</h1></Link>
        <div className='relative hidden md:block'>
            <form onSubmit={handleSubmit}>
                <input className={`p-2 text-black rounded-lg shadow-${shadow} ${theme?'shadow-md':'shadow-lg'} text-lg`} value={query} onChange={(e)=>setQuery(e.target.value)} placeholder='Search for meals...'/>
                <button type='submit' className='absolute right-1 text-gray-500 top-[50%] translate-y-[-50%]'><FaSearch/></button>
            </form>
        </div>
        {user?.email ? <div className='hidden md:flex text-lg md:items-center'>
            <Link onClick={_=>setShowMenu(false)} to='/account'><div className='mx-4 cursor-pointer'>Account</div></Link>
            <div onClick={handleLogout} className='mx-4 cursor-pointer'>Sign Out</div>
            <button onClick={changeTheme} className={`font-bold text-sm shadow-md rounded-xl p-2 shadow-${shadow}`}>{theme?<p className='flex items-center'><FaSun/><span className='mx-1'>Light Mode</span></p>:<p className='flex items-center'><FaMoon/><span className='mx-1'>Dark Mode</span></p>}</button>
        </div>:

        <div className='hidden md:flex text-lg md:items-center'>
            <Link onClick={_=>setShowMenu(false)} to='signin'><div className='mx-4 cursor-pointer'>Sign In</div></Link>
            <Link onClick={_=>setShowMenu(false)} to='signup'><div className='mx-4 cursor-pointer'>Sign Up</div></Link>
            <button onClick={changeTheme} className={`font-bold text-sm shadow-md rounded-xl p-2 shadow-${shadow}`}>{theme?<p className='flex items-center'><FaSun/><span className='mx-1'>Light Mode</span></p>:<p className='flex items-center'><FaMoon/><span className='mx-1'>Dark Mode</span></p>}</button>
        </div>
        }   
        <div className={`${showMenu?'rotate-90':'rotate-0'} transition-transform duration-500 block md:hidden text-4xl cursor-pointer z-40`} onClick={_=>setShowMenu(p=>!p)}><FaBars/></div>
        
        <div className={`fixed top-0 left-0 w-full h-full py-36 ${!theme?'bg-white':'bg-[#020816]'} transition-transform duration-500     ${showMenu?'translate-y-[0%]':'translate-y-[-100%]'}`}>
            <div className='relative flex flex-col justify-center items-center'>
                <form onSubmit={handleSubmit} className='my-4 relative w-[60%]'>
                    <input className={`p-2 rounded-lg shadow:${shadow} ${theme?'text-black':'text-white'} shadow-xl text-xl border-gray-500 border-2 w-full`} value={query} onChange={(e)=>setQuery(e.target.value)} placeholder='Search for meals...'/>
                    <button type='submit' className='absolute right-2 text-gray-500 top-[50%] translate-y-[-50%]'><FaSearch/></button>
                </form>
                {user?.email ?
                    <div className='w-[40%] text-center'>
                        <Link onClick={_=>setShowMenu(false)} to='/account' className='w-full'><div className={`my-4 cursor-pointer p-4 text-lg text-white hover:text-gray-500 transition duration-500 text-center hover:bg-white bg-gray-500 shadow-${shadow} shadow-lg rounded-lg`}>Account</div></Link>
                        <div className={`w-full my-4 cursor-pointer p-4 text-lg text-white hover:text-gray-500 transition duration-500 text-center hover:bg-white bg-gray-500 shadow-${shadow} shadow-lg rounded-lg`}>Sign Out</div>
                        <button onClick={changeTheme} className={`font-bold my-4  shadow-md rounded-xl p-2 shadow-${shadow}`}>{theme?<p className='flex items-center'><FaSun/><span className='mx-1'>Light Mode</span></p>:<p className='flex items-center'><FaMoon/><span className='mx-1'>Dark Mode</span></p>}</button>

                    </div>
                     :
                    <div className='w-[40%] text-center'>
                        <Link onClick={_=>setShowMenu(false)} to='signin' className='w-full'><div className={`my-4 cursor-pointer p-4 text-lg text-white hover:text-gray-500 transition duration-500 text-center hover:bg-white bg-gray-500 shadow-${shadow} shadow-lg rounded-lg`}>Sign In</div></Link>
                        <Link onClick={_=>setShowMenu(false)} to='signup' className='w-full'><div className={`my-4 cursor-pointer p-4 text-lg text-white hover:text-gray-500 transition duration-500 text-center hover:bg-white bg-gray-500 shadow-${shadow} shadow-lg rounded-lg`}>Sign Up</div></Link>
                        <button onClick={changeTheme} className={`font-bold my-4  shadow-md rounded-xl p-2 shadow-${shadow}`}>{theme?<p className='flex items-center'><FaSun/><span className='mx-1'>Light Mode</span></p>:<p className='flex items-center'><FaMoon/><span className='mx-1'>Dark Mode</span></p>}</button>
                        </div>
                }
            </div>
            
        </div>

    </nav>
  )
}

export default Navbar