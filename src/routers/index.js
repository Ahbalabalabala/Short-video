import React from "react";
import App from "App";
import Play from "views/Play";
import CateList from "views/CateList";
import Series from "views/Series";
import Album from "views/Album";

import { Route } from "react-router-dom";

export const routes = [
    {
        path: "/play/:id",
        component: Play,
    },
    {
        path: "/catelist",
        component: CateList,
    },
    {
        path: "/series",
        component: Series,
    },

    {
        path: "/album/:id",
        component: Album,
    },
    {
        path: "/",
        component: App,
    },
];

// A special wrapper for <Route> that knows how to
// handle "sub"-routes by passing them in a `routes`
// prop to the component it renders.
export function RouteWithSubRoutes(route) {
    return (
        <Route
            path={route.path}
            render={(props) => (
                // pass the sub-routes down to keep nesting
                <route.component {...props} routes={route.routes} />
            )}
        />
    );
}
