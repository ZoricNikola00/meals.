import axios from 'axios'
import {useParams,Link} from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

const fetchAreas=async()=>{
    const data=await axios.get('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
    return data?.data?.meals
}
type data={
    strArea:string
}
const AllAreas = () => {
    const {data,isLoading}=useQuery(['areas'],fetchAreas)

    console.log(data)
  return (
    <div className='w-[90%] md:w-[85%] lg:w-[75%] mx-auto shadow-xl p-4 rounded-lg my-4'>
        <h1 className='text-xl'>List Of All Availabel Available:</h1>
        <ul className='list-disc text-xl flex flex-wrap w-full justify-center'>
            {data?.map((x:data,i:number)=>{
                return <Link to={`/area/${x?.strArea}`}><li key={i} className='m-4 cursor-pointer font-bold p-2 rounded-xl hover:bg-gray-100'>{x?.strArea}</li></Link>
            })}
        </ul>
    </div>
  )
}

export default AllAreas