import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { hot } from 'react-hot-loader/root';
import { History } from 'history';
import Routes from '../routes/Routes';
import { ConfigProvider } from 'antd';
import vn from 'antd/lib/locale/vi_VN';

type Props = {
  store: any;
  history: History;
};

const Root = ({ store, history }: Props) => (
  <ConfigProvider locale={vn}>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Routes />
      </ConnectedRouter>
    </Provider>
  </ConfigProvider>
);

export default hot(Root);
