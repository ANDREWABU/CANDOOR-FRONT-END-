import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "./auth.service";
import { isAuthenticated, getSession } from "../Helpers/Functions";

export const ProtectedRoute = ({
  component: Component,
  ...rest
}) => {
  // console.log(props)
  return (
    <Route
      {...rest}
      render={props => {
        console.log(props)
        if (isAuthenticated()) {
          if (props.location.pathname == '/') {
            const user = getSession();
            console.log(user.__userDetail.roles[0].name);
            switch (user.__userDetail.roles[0].name) {
              case 'Mentee':
                return (
                  <Redirect
                    to={{
                      pathname: "/MenteeDashboard",
                    }}
                  />
                )
              case 'Mentor':
                return (
                  <Redirect
                    to={{
                      pathname: "/Dashboard",
                    }}
                  />
                )
            }
          }
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/login",
              }}
            />
          );
        }
      }}
    />
  );
};
