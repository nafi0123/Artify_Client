
import { Navigate, useLocation } from "react-router";
import Loading from "../components/Loading/Loading";
import useAuth from "../hooks/useAuth";


const PrivetProvider = ({ children }) => {
  const { user, loading } =useAuth();

  const location = useLocation();

  if (loading) {
    return <Loading></Loading>
  }

  if (user && user?.email) {
    return children;
  }

  return <Navigate state={location.pathname} to="login"></Navigate>; 
};

export default PrivetProvider;