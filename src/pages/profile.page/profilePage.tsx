import React, {ReactElement} from "react";
import {Navigation} from "../../components";
import {Profile} from "../../user";

export const ProfilePage: React.FC<any> = (props, context):ReactElement => {
  return (
    <div>
      <Navigation currentNavPathIndex={0}/>
      <Profile/>
    </div>
  );
}