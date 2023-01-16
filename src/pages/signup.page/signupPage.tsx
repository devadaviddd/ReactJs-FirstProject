import React, {ReactElement} from "react";
import {Navigation} from "../../components";
import {Signup} from "../../user";

export const SignupPage: React.FC<any> = (props, context):ReactElement => {
  return (
    <div>
      <Navigation currentNavPathIndex={2}/>
      <Signup/>
    </div>
  );
}