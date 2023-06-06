import './App.css';
import Upload from './components/fileUpload';
import ReviewApplication from './components/reviewApplication';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SocialSignup from './components/socialSignUp';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/review' element={<ReviewApplication />} />
        <Route path='/upload' element={<Upload />} />
        <Route path='/signup' element={<SocialSignup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
