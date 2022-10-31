import { doc, onSnapshot } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
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

  return (
    <div>
        {meals?.map((meal:any)=>{
            const {idMeal,strMeal,strMealThumb}=meal
            return <div></div>
        })}
    </div>
  )
}

export default FavoriteMeals