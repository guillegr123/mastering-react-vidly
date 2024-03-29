import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "../../services/authService";

const ProtectedRoute = ({ component: Component, render, ...rest }) => {
  return (
    <Route
      {...rest} // To pass any additional properties
      render={props => {
        if (!auth.getCurrentUser())
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          );
        return Component ? <Component {...props} /> : render(props); // Component should start with capital letter, so the transpiler for React does not complains
      }}
    />
  );
};

export default ProtectedRoute;
