import React from "react";
import { Route, Redirect } from "react-router-dom";
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
        if (isAuthenticated()) {
          if (props.location.pathname == '/') {
            const user = getSession();
            console.log(user)
            switch (user.__userDetail.user_roles[0]) {
              case 'Advisee':
                return (
                  <Redirect
                    to={{
                      pathname: "/advisee/dashboard",
                    }}
                  />
                )
              case 'Advisor':
                return (
                  <Redirect
                    to={{
                      pathname: "/advisor/dashboard",
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
