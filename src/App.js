import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './component/login';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login/>}/>
      </Routes>
    </>
  );
}

export default App;