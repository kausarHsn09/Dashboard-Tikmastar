import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  const location = useLocation();

  return (
    <div className='app-container'>
      {location.pathname !== '/login' && <Sidebar />}
      <div className='content'>
        {children}
      </div>
    </div>
  );
};

export default Layout;
