import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import routes from '../constants/routes.json';
import actions from '../store/actions';
import { ReduxStore } from '../store';
import { AuthState } from '../store/auth/reducer';

export default function HomePage() {
  const dispatch = useDispatch();
  const { user } = useSelector<ReduxStore, AuthState>((state) => state.auth);

  useEffect(() => {
    dispatch(actions.app.updateTitle('Trang chủ'));
  }, []);

  return (
    <>
      <h1>{user?.hoTen}</h1>
      <h5>{user?.quyenTruyCap}</h5>
      <Link to={routes.SIGN_IN}>Đăng xuất</Link>
    </>
  );
}
