
import React from "react";
import { Navigate, Route, useLocation } from 'react-router-dom'

const PublicRoute = ( { children } ) => {
console.log(children);
  const { state } = useLocation();

  //return children; 
  return state?.logged ? children : <Navigate to='login' />; 

  /* return state?.logged ? (
    <Route {...rest} element={element}/>
  ): (
    <Navigate to="/login" replace/>
  ) */
  
}

export default PublicRoute;
