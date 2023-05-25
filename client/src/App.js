import './App.css';
import SignIn from './components/logIn';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
