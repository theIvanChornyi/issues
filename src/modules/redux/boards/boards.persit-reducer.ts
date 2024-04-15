import persistReducer from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage';

import boardsReduser from './boards.slice';

const persistConfigBoards = {
	key: 'boards',
	storage,
	whitelist: ['repos', 'stars', 'currentBoard', 'state'],
};

const persistedBoards = persistReducer(persistConfigBoards, boardsReduser);

export default persistedBoards;
