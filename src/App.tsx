import {Routes, Route} from 'react-router-dom'
import List from './pages/List';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SingleDish from './pages/SingleDish';
import SpecificCategory from './pages/SpecificCategory';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Account from './pages/Account';


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
        <Route path='/account' element={<Account/>}/>
      </Routes>
    </>
  );
}

export default App;
