import React from 'react';
import { Route, Switch } from "react-router-dom";
import LineChart from '../LineChart';

function Routes(props) {
  return (
    <Switch>
      <Route path="/">
        <LineChart {...props} />
      </Route>
    </Switch>
  );
}

export default Routes;
