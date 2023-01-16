import React, {ReactElement} from "react";
import {Signin} from "../../user";
import {Navigation} from "../../components";

export const SigninPage: React.FC<any> = (props, context):ReactElement => {
  return (
    <div>
      <Navigation currentNavPathIndex={1}/>
      <Signin/>
    </div>
  );
}