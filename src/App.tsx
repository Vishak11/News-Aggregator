import Navbar from '../src/features/navbar/components/Navbar'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home/component/Home';
import Sports from './pages/Sports/component/Sports';
import Business from './pages/Business/component/Business';
import Politics from './pages/Politics/component/Politics';
import Science from './pages/Science/component/Science';
import Technology from './pages/Technology/component/Technology';
import SearchResult from './pages/SearchResult/component/SearchResult';
import MyNews from './pages/MyNews/component/MyNews';



function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/sports" element={<Sports/>} />
        <Route path="/business" element={<Business />} />
        <Route path="/politics" element={<Politics />} />
        <Route path="/science" element={<Science />} />
        <Route path="/technology" element={<Technology />} />
        <Route path="/search" element={<SearchResult />} />
        <Route path="/mynews" element={<MyNews />} />
        

      </Routes>
    </Router>
  );
}


export default App
