import {useParams} from 'react-router-dom'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

const fetchMeal=async(id:string|undefined)=>{
    const data=await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    return data?.data?.meals[0]
}
type Data={
    idMeal:number,
    strMeal:string,
    strCategory:string,
    strMealThumb:string,
    strYoutube:string,
    strInstructions:string,
    strArea:string,
  }
const SingleDish = () => {
    const {id}=useParams()
    const [sliced,setSliced]=useState(true)
    const {data,isLoading}=useQuery(['meal',id],()=>fetchMeal(id))
    //const {strMeal,strArea,strMealThumb,strCategory,strInstructions}=data
    const slicedText=(str:string,num:number)=>{
        if(str?.length > num && sliced){
            return str.slice(0,num)+'...'
        }
        return str
    }
  return (
    <>
      <div className='mt-4 w-[90%] p-4 md:w-[85%] lg:w-[75%] flex flex-col md:flex-row rounded-lg shadow-xl mx-auto'>
          <img src={data?.strMealThumb} className='md:hidden block w-[100%] h-fit rounded-xl'/>
          <div className='w-[100%] md:w-[60%] p-2 md:p-0'>
              <h1 className='text-xl uppercase mb-2'>{data?.strMeal}</h1>
              <div className='flex mb-4'><p className='text-gray-500'>Category: <span className=''>{data?.strCategory}</span></p> <p className='ml-5 text-gray-500'>Origin: <span>{data?.strArea}</span></p></div>
              <div className='w-[100%] md:w-[80%] flex flex-col'>
                <h2 className='mb-2'>Instructions:</h2>
                <p className='mb-2 md:p-4 whitespace-pre-line md:shadow-xl md:rounded-xl'>{slicedText(data?.strInstructions,500)} {data?.strInstructions.length>500 && <button className='text-gray-500 cursor-pointer' onClick={_=>setSliced((p:boolean)=>!p)}>{sliced?'Read More':'Show Less'}</button>}</p>
              </div>
          </div>
          <img src={data?.strMealThumb} className='hidden md:block w-[40%] h-fit rounded-xl'/>
      </div>
    </>
  )
}

export default SingleDish