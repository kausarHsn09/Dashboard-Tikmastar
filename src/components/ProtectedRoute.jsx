import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { selectUserToken } from "../features/authSlice";

const ProtectedRoute = ({ children }) => {
  const userToken = useSelector(selectUserToken);
  return userToken ? children : <Navigate to="/login" />;
};

export default ProtectedRoute