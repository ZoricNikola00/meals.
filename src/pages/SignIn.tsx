import React, { useState } from 'react'
import {Link} from 'react-router-dom'

const SignIn = () => {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

  return (
    <div className='max-w-[450px] h-[600px] bg-black/20 mx-auto rounded-lg shadow-xl py-8 my-8 '>
        <h1 className='text-2xl font-bold text-center'>Sign In</h1>
        <form className='flex flex-col items-center max-w-[320px] mx-auto'>
            <input className='p-4  rounded-xl shadow-xl my-4 w-full' placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <input className='p-4  rounded-xl shadow-xl my-4 w-full' placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <button type='submit' className='bg-gray-600 rounded-xl shadow-xl text-white my-4 p-4 w-full'>Sign Up</button>
            <div className='flex justify-between text-sm text-gray-600 w-full'>
                  <p><input className='mr-2' type='checkbox'/>Remember me</p>
                  <p>Need Help?</p>
            </div>
            <div className='flex my-4 w-full items-center'>
                <p className='text-gray-600'>Already subscribe to Meal. ?</p>
                <Link to='/signin' className='ml-5 text-lg'><p>Sign Up</p></Link>
            </div>
        </form>
    </div>  
      
      )
}

export default SignIn