import { SET_AUTH, SET_USER } from './types';

function setAuth(token: string | null): ActionPayload {
  return {
    type: SET_AUTH,
    payload: { token },
  };
}

function setUser(user: any): ActionPayload {
  return {
    type: SET_USER,
    payload: { user },
  };
}

export default {
  setAuth,
  setUser,
};
