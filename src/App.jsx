import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Sidebar from './components/Sidebar'
import Home from './pages/Home';
import Enrollments from './pages/Enrollments';
import Videos from './pages/Videos';
import Users from './pages/Users';
import Tutorials from './pages/Tutorials';
import Courses from './pages/Courses';

const App = () => {
  return (
    <Router>
      <div className='app-container'> 
      <Sidebar/>
      <div className='content'>
       <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/enrollments" element={<Enrollments />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/users" element={<Users />} />
        <Route path="/tutorials" element={<Tutorials />} />
        <Route path="/coureses" element={<Courses />} />
      </Routes>
      </div>
    </div>
    </Router>
  )
}

export default App