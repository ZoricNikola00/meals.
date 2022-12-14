import React from 'react'
import FavoriteMeals from '../components/FavoriteMeals'
import { useGlobalContext } from '../context'

const Account = () => {
  const {theme}=useGlobalContext()
  return (
    <div className={`${!theme?'bg-yellow-50':'bg-[#07171f]'} w-[90%] md:w-[85%] lg:w-[75%] mx-auto shadow-lg p-4 rounded-lg my-10`}>
        <h1 className='text-center text-4xl'>My Favorite Meals</h1>
        <FavoriteMeals/>
    </div>
  )
}

export default Account