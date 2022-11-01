
import AllAreas from '../components/AllAreas'
import AllCategories from '../components/AllCategories'
import Random from '../components/Random'
import { useGlobalContext } from '../context'


const Home = () => {
  const {shadow}=useGlobalContext()
  return (
    <>
        <div className={`w-[90%] md:w-[85%] lg:w-[75%] mx-auto shadow-lg p-4 rounded-lg my-10 shadow-${shadow}`}>
            <h1 className='text-center font-bold text-6xl'>Welcome To Meals.</h1>
            <Random/>
        </div>
        <AllCategories/>
        <AllAreas/>
    </>
  )
}

export default Home