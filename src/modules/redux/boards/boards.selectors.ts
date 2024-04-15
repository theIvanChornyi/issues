import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'modules/redux/types';

export const selectCurrentRepoUrl = (state: RootState) =>
	state.boards.currentBoard;

export const selectBoards = (state: RootState) => state.boards.repos;

export const selectCurrentBoardStars = (state: RootState) => state.boards.repos[state.boards.currentBoard].stars;

export const selectCurrentBoard = createSelector(
	[selectBoards, selectCurrentRepoUrl,],
	(boards, repoUri) => {
		return boards[repoUri].columns;
	}
);

export const selectState = (state: RootState) => state.boards.state;

export const selectError = (state: RootState) => state.boards.error;
