import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { selectUserToken, setToken } from "./features/authSlice";
import { Toaster } from 'react-hot-toast';

import Home from './pages/Home';
import Enrollments from './pages/Enrollments';
import Videos from './pages/Videos';
import Users from './pages/Users';
import Tutorials from './pages/Tutorials';
import Courses from './pages/Courses';
import Login from './pages/Login';

import Loader from './components/Loader';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';  // Import the new Layout component

const App = () => {
  const userToken = useSelector(selectUserToken);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => { 
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = localStorage.getItem("tokenFreelancing");
        if (token) {
          dispatch(setToken(token));
        } else {
          dispatch(setToken(null));
          localStorage.removeItem("tokenFreelancing");
        }
      } catch (error) {
        console.error("Error retrieving token from AsyncStorage:", error);
      }
    };
    checkToken();
  }, [dispatch]);

  if(loading) return <Loader />;
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><ProtectedRoute><Home /></ProtectedRoute></Layout>} />
        <Route path="/enrollments" element={<Layout><ProtectedRoute><Enrollments /></ProtectedRoute></Layout>} />
        <Route path="/videos" element={<Layout><ProtectedRoute><Videos /></ProtectedRoute></Layout>} />
        <Route path="/users" element={<Layout><ProtectedRoute><Users /></ProtectedRoute></Layout>} />
        <Route path="/tutorials" element={<Layout><ProtectedRoute><Tutorials /></ProtectedRoute></Layout>} />
        <Route path="/courses" element={<Layout><ProtectedRoute><Courses /></ProtectedRoute></Layout>} />
        <Route path="/login" element={userToken ? <Navigate to="/" /> : <Login />} />
      </Routes>
      <Toaster/>
    </Router>
  )
}

export default App;
