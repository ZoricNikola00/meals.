import axios from 'axios'
import {useParams,Link} from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

type Data={
    idCategory:number,
    strCategory:string,
    strCategoryThumb:string,
    strCategoryDescription:string
  }

  const fetchCategories=async()=>{
    const data=await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php')
    return data?.data?.categories
}
const AllCategories = () => {
    const {data,isLoading}=useQuery(['categories'],fetchCategories)


  return (
    <div className='w-[90%] md:w-[85%] lg:w-[75%] mx-auto shadow-xl p-4 rounded-lg my-4'>
    <h1 className='text-xl'>List Of All Meal Categories:</h1>
    <div className='flex flex-wrap justify-center'>
        {data?.map((x:Data)=>{
            const {idCategory,strCategory,strCategoryThumb,strCategoryDescription}=x
            return <div key={idCategory} className='overflow-hidden w-[200px] shadow-md hover:shadow-2xl m-8 rounded-lg'>
                    <Link to={`/category/c/${strCategory}`}><img src={strCategoryThumb} className='w-full'/></Link>
                    <p className='font-bold p-4 text-xl'>{strCategory}</p>
            </div>
        })}
    </div>
</div>
  )
}

export default AllCategories