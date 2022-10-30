import {Routes, Route} from 'react-router-dom'
import List from './pages/List';
import Navbar from './components/Navbar';
import Home from './pages/Home';


function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/list/:str' element={<List/>}/>
      </Routes>
    </>
  );
}

export default App;
