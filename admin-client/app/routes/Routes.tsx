import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Title from '../components/Title';
import SignInPage from '../pages/SignIn/SignInPage';
import AppRoutes from './AppRoutes';
import routes from '../constants/routes';
import ThiSinhSignInPage from '../pages/SignIn/ThiSinhSignInPage';
import ThiSinhRoutes from './ThiSinhRoutes';

function Routes() {
  return (
    <div>
      <Title />
      <Switch>
        <Route exact path={routes.DANG_NHAP} component={SignInPage} />
        <Route
          exact
          path={routes.THI_SINH_DANG_NHAP}
          component={ThiSinhSignInPage}
        />
        <Route path="/thi-sinh" component={ThiSinhRoutes} />
        <Route path="/" component={AppRoutes} />
      </Switch>
    </div>
  );
}

export default Routes;
