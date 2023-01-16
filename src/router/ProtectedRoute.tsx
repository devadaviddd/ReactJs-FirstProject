import React, {ReactElement} from "react";
import {Navigate} from "react-router-dom";

interface ProtectedRouteProps{
  children: JSX.Element;
}
export const ProtectedRoute: React.FC<ProtectedRouteProps> =(props, context):ReactElement => {
  if(!localStorage.getItem('token')) {
    return <Navigate to={"/"}/>
  }
  return props.children;
}