import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { useGlobalContext } from '../context'

const SignUp = () => {
    const {signUp}=useGlobalContext()
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const navigate=useNavigate()
    const {theme}=useGlobalContext()
    const handleSubmit=async (e:React.FormEvent)=>{
        e.preventDefault()
        try{
          await signUp(email, password)
          navigate('/')
        }
        catch(error){
          console.log(error)
        }
      }
  return (
    <div className={`${!theme?'bg-yellow-50':'bg-[#07171f]'} max-w-[450px] h-[600px] bg-black/20 mx-auto rounded-lg shadow-xl py-8 my-8`}>
        <h1 className='text-2xl font-bold text-center'>Sign Up</h1>
        <form onSubmit={handleSubmit} className='flex flex-col items-center max-w-[320px] mx-auto'>
            <input className='p-4  rounded-xl shadow-xl my-4 w-full' placeholder='Email' type='email' autoComplete='email' required value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <input className='p-4  rounded-xl shadow-xl my-4 w-full' placeholder='Password' autoComplete='current-password' required type='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <button type='submit' className='bg-gray-600 rounded-xl shadow-xl text-white my-4 p-4 w-full'>Sign Up</button>
            <div className='flex justify-between text-sm text-gray-600 w-full'>
                  <p><input className='mr-2' type='checkbox'/>Remember me</p>
                  <p>Need Help?</p>
            </div>
            <div className='flex my-4 w-full items-center'>
                <p className='text-gray-600'>Already subscribe to Meal. ?</p>
                <Link to='/signin' className='ml-5 text-lg'><p>Sign In</p></Link>
            </div>
        </form>
    </div>  
      
      )
}

export default SignUp