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
    const {data:meal1,isLoading,refetch:r1}=useQuery(['random',1],fetchRandom,{refetchOnWindowFocus:false})
    const {data:meal2,refetch:r2}=useQuery(['random',2],fetchRandom,{refetchOnWindowFocus:false})

    
   
    useEffect(()=>{
        const time=setTimeout(()=>{r1();r2()},5000)
        return ()=>clearTimeout(time)
    },[meal1])
    if(isLoading){
        return <div>LOADING</div>
    }
  return (
    <div className='w-full mx-auto my-20'>
        <h1 className='text-2xl'>Try One Of These Specialties :</h1>
        <div className='flex '>
            <div className='w-[50%] flex mt-10 flex-col md:flex-row'>
                <Link to={`/dish/${meal1?.idMeal}`} className='w-[90%] md:w-[60%]'><img className='w-full object-cover rounded-xl' src={meal1?.strMealThumb}/></Link>
                <div className='md:ml-4 my-4 md:my-0 w-[90%] md:w-[40%]'>
                    <h1 className='text-lg md:text-2xl'>{meal1?.strMeal}</h1>
                    <p className='text-gray-600 text-lg my-8'>Category: {meal1?.strCategory}</p>
                    <p className='text-gray-600 text-lg my-8'>Origin: {meal1?.strArea}</p>
                </div>
            </div>
            <div className='w-[50%] flex mt-10 flex-col md:flex-row'>
                <Link to={`/dish/${meal2?.idMeal}`} className='w-[90%] md:w-[60%]'><img className='w-full object-cover rounded-xl' src={meal2?.strMealThumb}/></Link>
                <div className='md:ml-4 my-4 md:my-0 w-[90%] md:w-[40%]'>
                    <h1 className='text-lg md:text-2xl '>{meal2?.strMeal}</h1>
                    <p className='text-gray-600 text-lg my-8'>Category: {meal2?.strCategory}</p>
                    <p className='text-gray-600 text-lg my-8'>Origin: {meal2?.strArea}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Random