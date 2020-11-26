import React from 'react';
import { Route, Switch } from 'react-router';
import PageThamGiaThi from '../pages/ThamGiaThi/PageThamGiaThi';
import PageThiTracNghiem from '../pages/ThiTracNghiem/PageThiTracNghiem';

function ThiSinhRoutes() {
  return (
    <Switch>
      <Route exact path="/thi-sinh/" component={PageThamGiaThi} />
      <Route
        exact
        path="/thi-sinh/thi-trac-nghiem"
        component={PageThiTracNghiem}
      />
    </Switch>
  );
}

export default ThiSinhRoutes;
//location.href = "file:///D:/Projects/do-an-chuyen-nganh/admin-client/app/app.html#/thi-sinh-dang-nhap"
