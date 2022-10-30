import {Routes, Route} from 'react-router-dom'
import List from './pages/List';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SingleDish from './pages/SingleDish';
import SpecificCategory from './pages/SpecificCategory';
import AreaMeal from './pages/AreaMeal';


function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/list/:str' element={<List/>}/>
        <Route path='/dish/:id' element={<SingleDish/>}/>
        <Route path='/category/:str' element={<SpecificCategory/>}/>
        <Route path='/area/:str' element={<AreaMeal/>}/>
      </Routes>
    </>
  );
}

export default App;
