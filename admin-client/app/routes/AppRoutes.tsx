import { Redirect, Route, Switch } from 'react-router-dom';
import routes from '../constants/routes';
import App from '../containers/App';
import PageTaiKhoan from '../pages/TaiKhoan/PageTaiKhoan';
import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from '../api';
import handleErrors from '../shared/handleErrors';
import { ReduxStore } from '../store';
import actions from '../store/actions';
import { AuthState } from '../store/auth/reducer';
import PageHocPhan from '../pages/HocPhan/PageHocPhan';
import PageLopHoc from '../pages/LopHoc/PageLopHoc';
import PageSinhVien from '../pages/SinhVien/PageSinhVien';
import PageKhoCauHoi from '../pages/KhoCauHoi/PageKhoCauHoi';

function RedirectRoute() {
  return <Redirect to={routes.TAI_KHOAN} />;
}

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
      console.log(error);
    }

    setTriedLogin(true);
  }, [dispatch, isAuthenticated, triedLogin]);

  useEffect(() => {
    if (!isAuthenticated) tryLoginByToken();
  }, [isAuthenticated, tryLoginByToken, triedLogin]);

  return (
    ((isAuthenticated || (!isAuthenticated && !triedLogin)) && (
      <App>
        <Switch>
          <Route exact path={routes.TAI_KHOAN} component={PageTaiKhoan} />
          <Route exact path={routes.HOC_PHAN} component={PageHocPhan} />
          <Route exact path={routes.LOP_HOC} component={PageLopHoc} />
          <Route
            exact
            path={routes.LOP_HOC + '/:idLopHoc/sinh-vien'}
            component={PageSinhVien}
          />
          <Route
            exact
            path={routes.HOC_PHAN + '/:idHocPhan/kho-cau-hoi'}
            component={PageKhoCauHoi}
          />
          <Route exact path="/" component={RedirectRoute} />
        </Switch>
      </App>
    )) || <Redirect to={routes.DANG_NHAP} />
  );
}
