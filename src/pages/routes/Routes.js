import React, { lazy, Suspense } from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import Portlet from "../../components/portlet/Portlet";
import Loading from "../../components/Loading";

const HomePage = lazy(() => import("../Home"));
const CafesPage = lazy(() => import("../Cafes"));
const Routes = () => (
  <Portlet className="position-relative">
    <Suspense fallback={Loading}>
      <Switch>
        <Route path="/" component={HomePage} exact />
        <Route path="/cafes" component={CafesPage} exact />
        <Redirect to="/" />
      </Switch>
    </Suspense>
  </Portlet>
);

export default Routes;
