import './App.css';
import Upload from './components/fileUpload';
import ReviewApplication from './components/reviewApplication';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/review' element={<ReviewApplication />} />
        <Route path='/upload' element={<Upload />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
