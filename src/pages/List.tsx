import React from 'react'
import axios from 'axios'
import {useParams,Link} from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

const fetchSearch=async(str:string|undefined)=>{
  const data=await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${str}`)
  return data?.data?.meals
}

type Data={
  idMeal:number,
  strMeal:string,
  strCategory:string,
  strMealThumb:string,
}

const List = () => {
  const {str}=useParams()
  const {data,isLoading}=useQuery(['list',str],()=>fetchSearch(str))
  return (
    <>
      <div className='w-[90%] md:w-[85%] lg:w-[75%]  rounded-lg shadow-xl mx-auto'>
        <div className='text-center'>
          <h1 className='text-lg'>You search word was:</h1>
          <p className='text-xl'>{str}</p>
        </div>
      </div>
      <div className='mt-4 flex flex-wrap justify-center w-[90%] md:w-[85%] lg:w-[75%]  rounded-lg shadow-xl mx-auto'>
        {data?.map((x:Data)=>{
          const {idMeal,strCategory,strMeal,strMealThumb}=x
          return <div key={idMeal} className='overflow-hidden w-[250px] shadow-md hover:shadow-2xl m-8 rounded-lg'>
            <Link to={`/dish/${idMeal}`}><img src={strMealThumb} className='w-full'/></Link>
            <div className='p-4'>
              <p className='text-lg uppercase'>{strMeal}</p>
              <p className='text-gray-500'>{strCategory}</p>
            </div>
          </div>
        })}
      </div>
    </>
  )
}

export default List