import flattenDeep from "lodash/flattenDeep";
import React from "react";
import { Routes as ReactRoutes, Route } from "react-router-dom";

import ProtectedRoute from "./protectedroute/ProtectedRoute";

const generateFlattenRoutes = (routes) => {
  if (!routes) return [];
  return flattenDeep(
    routes.map(({ routes: subRoutes, ...rest }) => [
      rest,
      generateFlattenRoutes(subRoutes),
    ])
  );
};

export const renderRoutes = (mainRoutes) => {
  const Routes = ({ isAuthorized }) => {
    const layouts = mainRoutes.map(({ layout: Layout, routes }, index) => {
      const subRoutes = generateFlattenRoutes(routes);

      return (
        <Route key={index} element={<Layout />}>
          {subRoutes.map(
            ({
              component: Component,
              path,
              name,
              isPublic,
              allowedUserType,
            }) => {
              if (isPublic) {
                // Rota pública
                return (
                  Component &&
                  path && (
                    <Route key={name} element={<Component />} path={path} />
                  )
                );
              } else {
                // Rota protegida
                return (
                  Component &&
                  path && (
                    <Route
                      key={name}
                      element={
                        <ProtectedRoute
                          isAuthorized={isAuthorized}
                          acesso={allowedUserType}
                        />
                      }
                    >
                      <Route element={<Component />} path={path} />
                    </Route>
                  )
                );
              }
            }
          )}
        </Route>
      );
    });
    return <ReactRoutes>{layouts}</ReactRoutes>;
  };
  return Routes;
};
