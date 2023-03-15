import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './Components/Navbar';
import { About } from './Components/About';
import { News } from './Components/News';

function App() {
  const pageSize=9;

  return (
    <Router>
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<News key="general" pageSize={pageSize} category={'general'} />} />
        <Route path='/business' element={<News key="business" pageSize={pageSize} category={'business'} />} />
        <Route path='/entertainment' element={<News key="entertainment" pageSize={pageSize} category={'entertainment'} />} />
        <Route path='/general' element={<News key="general" pageSize={pageSize} category={'general'} />} />
        <Route path='/health' element={<News key="health" pageSize={pageSize} category={'health'} />} />
        <Route path='/science' element={<News key="science" pageSize={pageSize} category={'science'} />} />
        <Route path='/sports' element={<News key="sports" pageSize={pageSize} category={'sports'} />} />
        <Route path='/technology' element={<News key="technology" pageSize={pageSize} category={'technology'} />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </>
    </Router>
  );
}

export default App;
