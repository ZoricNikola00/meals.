import { doc, getDocFromCache, onSnapshot, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useGlobalContext } from '../context'
import { db } from '../firebase'

const FavoriteMeals = () => {
    const [meals,setMeals]=useState([])
    const {user}=useGlobalContext()
    useEffect(()=>{
        onSnapshot(doc(db,'users',`${user?.email}`),(d)=>{
            setMeals(d.data()?.favoriteMeals)
        })
    },[user?.email])

    const mealId=doc(db,'users',`${user?.email}`)

    const deleteMeal=async(id:number)=>{
        try{
            const doc=await getDocFromCache(mealId)
            const newFavorite=doc.data()?.favoriteMeals.filter((x:any)=>x.idMeal!==id)
            await updateDoc(mealId,{
                favoriteMeals:newFavorite
            })
        }
        catch(err){console.log(err)}
    }
  return (
        <div className='mt-4 flex flex-wrap justify-center w-[90%] md:w-[85%] lg:w-[75%] mx-auto'>
        {meals?.map((x:any)=>{
          const {idMeal,strMeal,strMealThumb}=x
          return <div key={idMeal} className={`overflow-hidden w-[250px] shadow-lg m-8 rounded-lg relative`}>
            <Link to={`/dish/${idMeal}`}><img src={strMealThumb} className='w-full'/></Link>
            <div onClick={_=>deleteMeal(idMeal)} className='absolute cursor-pointer text-white bg-black/50 rounded-full p-2 top-2 right-2'><FaTimes/></div>
            <div className='p-4'>
              <p className='text-lg uppercase font-bold'>{strMeal}</p>
            </div>
          </div>
        })}
      </div>
  )
}

export default FavoriteMeals