import { UPDATE_TITLE } from './types';

function updateTitle(title: string): ActionPayload {
  return {
    type: UPDATE_TITLE,
    payload: { title },
  };
}

export default {
  updateTitle,
};
