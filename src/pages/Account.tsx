import React from 'react'
import FavoriteMeals from '../components/FavoriteMeals'

const Account = () => {
  return (
    <div className='w-[90%] md:w-[85%] lg:w-[75%] mx-auto shadow-xl p-4 rounded-lg my-10'>
        <h1 className='text-center text-4xl'>My Favorite Meals</h1>
        <FavoriteMeals/>
    </div>
  )
}

export default Account