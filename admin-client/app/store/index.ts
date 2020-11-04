import { configureStore, getDefaultMiddleware, Action } from '@reduxjs/toolkit';
import { createHashHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { createLogger } from 'redux-logger';
import { ThunkAction } from 'redux-thunk';
import createRootReducer from './rootReducer';
import { AppState } from './app/reducer';
import { AuthState } from './auth/reducer';

export const history = createHashHistory();

const rootReducer = createRootReducer(history);
const router = routerMiddleware(history);
const middleware = [...getDefaultMiddleware(), router];
const excludeLoggerEnvs = ['test', 'production'];
const shouldIncludeLogger = !excludeLoggerEnvs.includes(
  process.env.NODE_ENV || ''
);

if (shouldIncludeLogger) {
  const logger = createLogger({
    level: 'info',
    collapsed: true,
  });
  middleware.push(logger);
}

export const configuredStore = (initialState?: RootState) => {
  const store = configureStore({
    reducer: rootReducer,
    middleware,
    preloadedState: initialState,
  });
  return store;
};

export type RootState = ReturnType<typeof rootReducer>;
export type ReduxStore = {
  app: AppState;
  auth: AuthState;
};
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
