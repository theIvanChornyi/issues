import { IBoardsState, STATE_MACHINE } from './boards.types';

export const initialState: IBoardsState = {
  currentBoard: '',
  repos: {},
  state: STATE_MACHINE.IDLE,
  error: { code: NaN, message: '' },
};
