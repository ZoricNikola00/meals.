
import AllCategories from '../components/AllCategories'


const Home = () => {
  return (
    <>
        <div className='w-[90%] md:w-[85%] lg:w-[75%] mx-auto shadow-xl p-4 rounded-lg my-4'>
            <h1 className='text-center font-bold text-6xl'>Welcome To Meals.</h1>
        </div>
        <AllCategories/>
    </>
  )
}

export default Home