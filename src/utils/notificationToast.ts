import { Store } from 'react-notifications-component';
import {NOTIFICATION_TYPE} from "react-notifications-component/dist/src/typings";

export const notificationToast = (type: NOTIFICATION_TYPE, message: string) => {
  Store.addNotification({
    message: message,
    type: type,
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 5000,
      onScreen: true
    }
  });
}

