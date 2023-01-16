import React, {ReactElement} from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import {HomePage, SigninPage, ProfilePage, SignupPage, LogoutPage} from "../pages";
import {ProtectedRoute} from "./ProtectedRoute";

export const AppRouter: React.FC<any> = (props, context): ReactElement => {
  const route = () => {
    return createBrowserRouter([
      {
        path: "/",
        element: <HomePage/>,
      },
      {
        path: "/signin",
        element: <SigninPage/>,
      },
      {
        path: "/signup",
        element: <SignupPage/>,
      },
      {
        path: "/profile",
        element: <ProtectedRoute children={<ProfilePage/>}/>,
      },
      {
        path: "/logout",
        element: <LogoutPage/>
      },
      {
        path: "*",
        element: <p>There's nothing here: 404!</p>
      }
    ])
  }
  return (
    <div>
      <RouterProvider router={route()} />
    </div>
  )
}
