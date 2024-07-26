import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { selectUserToken, setToken } from "./features/authSlice";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Home";
import Enrollments from "./pages/Enrollments";
import Users from "./pages/Users";
import Tutorials from "./pages/Tutorials";
import Courses from "./pages/Courses";
import Login from "./pages/Login";
import Video from "./pages/Video";

import Loader from "./components/Loader";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout"; // Import the new Layout component
import Withdraw from "./pages/Withdraw";

import Settings from "./pages/Settings";
import Category from "./pages/Category";
import Hashtag from "./pages/Hashtag";
import Caption from "./pages/Caption";
import Script from "./pages/Script";

import Bio from "./pages/Bio";
import NickName from "./pages/NickName";
import Content from "./pages/Content";

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

  if (loading) return <Loader />;
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            </Layout>
          }
        />
        <Route
          path="/enrollments"
          element={
            <Layout>
              <ProtectedRoute>
                <Enrollments />
              </ProtectedRoute>
            </Layout>
          }
        />

        <Route
          path="/course/video/:id"
          element={
            <Layout>
              <ProtectedRoute>
                <Video />
              </ProtectedRoute>
            </Layout>
          }
        />
        <Route
          path="/users"
          element={
            <Layout>
              <ProtectedRoute>
                <Users />
              </ProtectedRoute>
            </Layout>
          }
        />
        <Route
          path="/tutorials"
          element={
            <Layout>
              <ProtectedRoute>
                <Tutorials />
              </ProtectedRoute>
            </Layout>
          }
        />
        <Route
          path="/courses"
          element={
            <Layout>
              <ProtectedRoute>
                <Courses />
              </ProtectedRoute>
            </Layout>
          }
        />

        <Route
          path="/withdraw"
          element={
            <Layout>
              <ProtectedRoute>
                <Withdraw />
              </ProtectedRoute>
            </Layout>
          }
        />
        
        <Route
          path="/settings"
          element={
            <Layout>
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            </Layout>
          }
        />
        <Route
          path="/category"
          element={
            <Layout>
              <ProtectedRoute>
                <Category />
              </ProtectedRoute>
            </Layout>
          }
        />
        <Route
          path="/hashtag"
          element={
            <Layout>
              <ProtectedRoute>
                <Hashtag />
              </ProtectedRoute>
            </Layout>
          }
        />
        <Route
          path="/caption"
          element={
            <Layout>
              <ProtectedRoute>
                <Caption />
              </ProtectedRoute>
            </Layout>
          }
        />
   
        <Route
          path="/script"
          element={
            <Layout>
              <ProtectedRoute>
                <Script />
              </ProtectedRoute>
            </Layout>
          }
        />
        <Route
          path="/bio"
          element={
            <Layout>
              <ProtectedRoute>
                <Bio />
              </ProtectedRoute>
            </Layout>
          }
        />
        <Route
          path="/content"
          element={
            <Layout>
              <ProtectedRoute>
                <Content />
              </ProtectedRoute>
            </Layout>
          }
        />
        <Route
          path="/nickname"
          element={
            <Layout>
              <ProtectedRoute>
                <NickName />
              </ProtectedRoute>
            </Layout>
          }
        />


        <Route
          path="/login"
          element={userToken ? <Navigate to="/" /> : <Login />}
        />
      </Routes>
      <Toaster />
    </Router>
  );
};

export default App;
