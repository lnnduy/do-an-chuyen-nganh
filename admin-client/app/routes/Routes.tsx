import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Title from '../components/Title';
import SignInPage from '../pages/SignInPage';
import AppRoutes from './AppRoutes';

function Routes() {
  return (
    <div>
      <Title />
      <Switch>
        <Route exact path="/sign-in" component={SignInPage} />
        <Route path="/" component={AppRoutes} />
      </Switch>
    </div>
  );
}

export default Routes;
