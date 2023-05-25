import './App.css';
import ReviewApplication from './components/reviewApplication';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ReviewApplication />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
