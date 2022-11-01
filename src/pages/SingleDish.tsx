import {useParams,useNavigate} from 'react-router-dom'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { useState, } from 'react'
import {AiFillHeart,AiOutlineHeart} from 'react-icons/ai'
import { useGlobalContext } from '../context'
import { updateDoc,doc, arrayUnion, onSnapshot, getDocFromCache } from 'firebase/firestore'
import { db } from '../firebase'

const fetchMeal=async(id:string|undefined)=>{
    const data=await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    return data?.data?.meals[0]
}

const SingleDish = () => {
    const {user,theme}=useGlobalContext()
    const {id}=useParams()
    const [sliced,setSliced]=useState(true)
    const [liked,setLiked]=useState(false)
    const navigate=useNavigate()
    const {data}=useQuery(['meal',id],()=>fetchMeal(id),{onSuccess:()=>{
      if(user?.email){
      onSnapshot(doc(db,'users',`${user?.email}`),(d)=>{
        if(d.data()?.favoriteMeals.some((x:any)=>x.idMeal===id)) setLiked(true)
          })}
      }})

    const slicedText=(str:string,num:number)=>{
        if(str?.length > num && sliced){
            return str.slice(0,num)+'...'
        }
        return str
    }
    const mealId=doc(db,'users',`${user?.email}`)
    const saveMeal=async()=>{
      if(user?.email){
        if(!liked){
        setLiked(true)
        await updateDoc(mealId,{
          favoriteMeals:arrayUnion({
            ...data
          })
        })
      }
        else if(liked){
          const doc=await getDocFromCache(mealId)
          const newFavorite=doc.data()?.favoriteMeals.filter((x:any)=>x.idMeal!==id)
          setLiked(false)
          await updateDoc(mealId,{
              favoriteMeals:newFavorite
          })
        }
  
      }
      else{
        alert("You are not logged in!")
      }
    }
   
  return (
    <>
      <div className={`${!theme?'bg-yellow-50':'bg-[#07171f]'} mt-10 w-[90%] p-4 md:w-[85%] lg:w-[75%] flex flex-col md:flex-row rounded-lg shadow-lg mx-auto`}>
          <img src={data?.strMealThumb} className='md:hidden block w-[100%] h-fit rounded-xl'/>
          <div className='w-[100%] md:w-[60%] p-2 md:p-0'>
              <div className='mb-2 flex items-center justify-between   w-[100%] md:w-[80%]'>
                <h1 className='text-xl uppercase '>{data?.strMeal}</h1>
                <button onClick={saveMeal} className='text-gray-600 text-5xl cursor-pointer' >{liked?<AiFillHeart />:<AiOutlineHeart/>}</button>
              </div>
              <div className='flex mb-4'><p className='text-gray-500'>Category: <span className='cursor-pointer hover:text-gray-700' onClick={_=>navigate(`/category/c/${data?.strCategory}`)}>{data?.strCategory}</span></p> <p className='ml-5 text-gray-500'>Origin: <span className='cursor-pointer hover:text-gray-700' onClick={_=>navigate(`/category/a/${data?.strArea}`)}>{data?.strArea}</span></p></div>
              <div className='w-[100%] md:w-[80%] flex flex-col'>
                <h2 className='mb-2'>Instructions:</h2>
                <p className={`mb-2 md:p-4 whitespace-pre-line md:shadow-sm md:rounded-xl`}>{slicedText(data?.strInstructions,500)} {data?.strInstructions.length>500 && <button className='text-gray-500 cursor-pointer' onClick={_=>setSliced((p:boolean)=>!p)}>{sliced?'Read More':'Show Less'}</button>}</p>
              </div>
          </div>
          <img src={data?.strMealThumb} className='hidden md:block w-[40%] h-fit rounded-xl'/>
      </div>
    </>
  )
}

export default SingleDish