// App.js
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Chatbot from './components/Chatbot';
import ImageGenerator from './components/ImageGenerator';
import NotFound from './components/NotFound.js';
import Home from './components/Home.jsx';
import './index.css';
function App() {
  return (
    <Router>
      <div>
        <nav className='mt-5 h-10 w-full'>
          <Link className='ml-5 bg-blue-100 text-blue-800 font-semibold py-2 px-4 rounded' to="/chatbot">Chat Bot</Link>
          <Link className='ml-5 bg-blue-100 text-blue-800 font-semibold py-2 px-4 rounded' to="/imagegenerator">Text to Image</Link>
          <Link className='ml-5 bg-blue-100 text-blue-800 font-semibold py-2 px-4 rounded' to="/imagegenerator">Text to Video</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/imagegenerator" element={<ImageGenerator />} />
          <Route path="/videogenerator" element={<VideoGenerator />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
