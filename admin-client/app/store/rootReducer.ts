import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import app from './app/reducer';
import auth from './auth/reducer';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    app,
    auth,
  });
}
