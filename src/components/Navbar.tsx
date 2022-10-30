import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import {useNavigate, Link} from 'react-router-dom'
import {FaSearch} from 'react-icons/fa'

const Navbar = () => {
    const [query,setQuery]=useState('')
    const nav=useNavigate()
    const handleSubmit=(e:React.FormEvent)=>{
        e.preventDefault()
        nav(`/list/${query}`)
    }
  return (
    <nav className='w-[90%] md:w-[85%] lg:w-[75%] mx-auto shadow-xl p-4 px-8 rounded-lg my-4 flex items-center justify-between'>
        <Link to='/'><h1 className='text-4xl font-bold uppercase'>Meals.</h1></Link>
        <div className='relative '>
            <form onSubmit={handleSubmit}>
                <input className='p-2 rounded-lg shadow-xl text-lg' value={query} onChange={(e)=>setQuery(e.target.value)} placeholder='Search for meals...'/>
                <button type='submit' className='absolute right-1 text-gray-500 top-[50%] translate-y-[-50%]'><FaSearch/></button>
            </form>
        </div>
        <div className='flex text-lg'>
            <div className='mx-4 cursor-pointer'>Sign In</div>
            <div className='mx-4 cursor-pointer'>Sign Up</div>
        </div>
    </nav>
  )
}

export default Navbar