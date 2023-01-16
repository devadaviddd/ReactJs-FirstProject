import React, {ReactElement} from "react";
import {Navigation} from "../../components";

export const HomePage: React.FC<any> = (props, context):ReactElement => {
  return (
    <div>
      <Navigation currentNavPathIndex={0}/>
    </div>
  );
}