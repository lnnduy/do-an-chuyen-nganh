import { UPDATE_TITLE } from './types';

export type AppState = {
  title: string;
};

const initialState: AppState = {
  title: '',
};

export default function (
  state = initialState,
  action: ActionPayload
): AppState {
  const { type, payload } = action;

  switch (type) {
    case UPDATE_TITLE: {
      const { title } = payload;
      state = { ...state, title };
      return state;
    }
    default: {
      return state;
    }
  }
}
