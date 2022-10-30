import {Routes, Route} from 'react-router-dom'
import List from './pages/List';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SingleDish from './pages/SingleDish';
import SpecificCategory from './pages/SpecificCategory';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';


function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/list/:str' element={<List/>}/>
        <Route path='/dish/:id' element={<SingleDish/>}/>
        <Route path='/category/:type/:str' element={<SpecificCategory/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/signin' element={<SignIn/>}/>

      </Routes>
    </>
  );
}

export default App;
