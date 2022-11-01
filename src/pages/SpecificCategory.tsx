import React from 'react'
import axios from 'axios'
import {useParams,Link} from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useGlobalContext } from '../context'

const fetchSearch=async(str:string|undefined,type:string|undefined)=>{
  const data=await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?${type}=${str}`)
  return data?.data?.meals
}

type Data={
  idMeal:number,
  strMeal:string,
  strMealThumb:string,
}

const SpecificCategory = () => {
  const {type,str}=useParams()
  const {theme}=useGlobalContext()
  const {data,isLoading}=useQuery(['category',str,type],()=>fetchSearch(str,type))
  return (
    <>
      <div className={`${!theme?'bg-yellow-50':'bg-[#07171f]'} w-[90%] md:w-[85%] lg:w-[75%] my-10 rounded-lg shadow-lg mx-auto `}>
        <div className='text-center'>
        <h1 className='text-3xl p-4'>{str}:</h1>
        </div>
      </div>
      <div className={`${!theme?'bg-yellow-50':'bg-[#07171f]'} mt-4 flex flex-wrap justify-center w-[90%] md:w-[85%] lg:w-[75%]  rounded-lg shadow-xl mx-auto`}>
        {data?.map((x:Data)=>{
          const {idMeal,strMeal,strMealThumb}=x
          return <div key={idMeal} className={`overflow-hidden w-[250px] shadow-md hover:shadow-2xl m-8 rounded-lg`}>
            <Link to={`/dish/${idMeal}`}><img src={strMealThumb} className='w-full'/></Link>
            <div className='p-4'>
              <p className='text-lg uppercase font-bold'>{strMeal}</p>
            </div>
          </div>
        })}
      </div>
    </>
  )
}


export default SpecificCategory