import React, {ReactElement} from 'react';
import {AppRouter} from "./router";
import "bootstrap/dist/css/bootstrap.min.css";
import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

export const App: React.FC<any> = (props, context):ReactElement => {
  return (
    <div>
      <ReactNotifications/>
      <AppRouter/>
    </div>
  );
}

