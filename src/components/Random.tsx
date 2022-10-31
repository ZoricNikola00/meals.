import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
type Data={
    idMeal:number,
    strCategory:string,
    strMealThumb:string,
    strArea:string,
    strCategoryDescription:string
  }

  const fetchRandom=async()=>{
    const data=await axios.get('https://www.themealdb.com/api/json/v1/1/random.php')
    return data?.data?.meals[0]
}
const Random = () => {
    const {data,isLoading,refetch}=useQuery(['random'],fetchRandom)
   
    useEffect(()=>{
        const time=setTimeout(()=>{refetch()},5000)
        return ()=>clearTimeout(time)
    },[data])
   
  return (
    <div className='w-[90%] md:w-[85%] lg:w-[55%] mx-auto shadow-xl p-4 rounded-lg my-4'>
        <h1 className='text-2xl'>Try This Specialty</h1>
        <div className='w-full flex my-10 flex-col md:flex-row'>
            <Link to={`/dish/${data?.idMeal}`}><img className='w-[300px] mx-auto md:w-[400px] rounded-xl' src={data?.strMealThumb}/></Link>
            <div className='ml-4 my-4 md:my-0'>
                <h1 className='text-2xl md:text-4xl'>{data?.strMeal}</h1>
                <p className='text-gray-600 text-lg my-8'>Category: {data?.strCategory}</p>
                <p className='text-gray-600 text-lg my-8'>Origin: {data?.strArea}</p>
            </div>
        </div>
    </div>
  )
}

export default Random