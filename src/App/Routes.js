import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { PATHS } from './constants'
import LineChart from '../LineChart'
import BarChart from '../BarChart'

function Routes(props) {
  return (
    <Switch>
      <Route path={PATHS[0].PATH} exact>
        <LineChart {...props} />
      </Route>
      <Route path={PATHS[1].PATH}>
        <BarChart {...props} />
      </Route>
    </Switch>
  )
}

export default Routes
