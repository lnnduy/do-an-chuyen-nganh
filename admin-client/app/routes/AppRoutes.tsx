import { Redirect, Route, Switch } from 'react-router-dom';
import routes from '../constants/routes.json';
import App from '../containers/App';
import HomePage from '../pages/HomePage';
import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from '../api';
import handleErrors from '../shared/handleErrors';
import { ReduxStore } from '../store';
import actions from '../store/actions';
import { AuthState } from '../store/auth/reducer';

export default function AppRoutes() {
  const { isAuthenticated } = useSelector<ReduxStore, AuthState>(
    (state) => state.auth
  );
  const [triedLogin, setTriedLogin] = useState(false);
  const dispatch = useDispatch();

  const tryLoginByToken = useCallback(async () => {
    if (isAuthenticated || triedLogin) return;

    const token = localStorage.getItem('token');

    try {
      const res = await api.auth.getUser();

      if (res.success) {
        dispatch(actions.auth.setAuth(token));
        dispatch(actions.auth.setUser(res.data));
      }
    } catch (error) {
      handleErrors(error);
    }

    setTriedLogin(true);
  }, [dispatch, isAuthenticated, triedLogin]);

  useEffect(() => {
    if (!isAuthenticated) tryLoginByToken();
  }, [isAuthenticated, tryLoginByToken, triedLogin]);

  return (
    (isAuthenticated && tryLoginByToken && (
      <App>
        <Switch>
          <Route exact path={routes.HOME} component={HomePage} />
        </Switch>
      </App>
    )) || <Redirect to={routes.SIGN_IN} />
  );
}
