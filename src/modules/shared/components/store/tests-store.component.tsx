import { FC } from 'react';
import { Provider } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';

import { IBoardsState } from '../../../redux/boards/boards.types';

interface IProps {
  children: JSX.Element | string | JSX.Element[];
  store: IBoardsState;
}

const TestStore: FC<IProps> = ({ children, store: initialState }) => {
  const boards = createSlice({
    name: 'boards',
    initialState,
    reducers: {},
  }).reducer;

  const store = configureStore({
    reducer: { boards },
  });

  return <Provider store={store}>{children}</Provider>;
};

export default TestStore;
