import React, {ReactElement} from "react";
import {Navigation} from "../../components";
import {Navigate} from "react-router-dom";

export const LogoutPage: React.FC<any> = (props, context):ReactElement => {
  localStorage.removeItem('token');
  return (
    <div>
      <Navigate to={'/signin'}/>
    </div>
  );
}