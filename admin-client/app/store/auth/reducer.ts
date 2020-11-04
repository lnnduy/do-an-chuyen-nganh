import { CLEAR_AUTH, SET_AUTH, SET_USER } from './types';

export type AuthState = {
  isAuthenticated: boolean;
  user: any;
  token: string | null;
};

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

export default function (
  state: AuthState = initialState,
  action: ActionPayload
): AuthState {
  const { type, payload } = action;

  switch (type) {
    case SET_AUTH: {
      const { token } = payload;
      state = { ...state, token, isAuthenticated: true };
      return state;
    }
    case CLEAR_AUTH: {
      state = { ...initialState };
      return state;
    }
    case SET_USER: {
      const { user } = payload;
      state = { ...state, user: { ...user } };
      return state;
    }
    default: {
      return state;
    }
  }
}
