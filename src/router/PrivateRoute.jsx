
import React from "react";
import { Navigate, Route, useLocation, Outlet,useNavigate  } from 'react-router-dom'


const PrivateRoute = ({children, state}) => {

  /* const { state } = useLocation(); */
  /* const navigate = useNavigate();
  const state = navigate().state; */
  const authToken = sessionStorage.getItem('authToken');
  const logged = sessionStorage.getItem('logged');
  console.log(logged);

  if(logged && logged == "true"){
    console.log("entro");
    return children ? children : <Outlet/>;
  }else{
    console.log("al login");
    return <Navigate to="/login"/>
  }

};

export default PrivateRoute;
