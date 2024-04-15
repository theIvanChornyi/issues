import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IBoardsState, IConfig, STATE_MACHINE } from './boards.types';
import { fetchIssues } from './boards.thunk';

const initialState: IBoardsState = {
	currentBoard: '',
	repos: {},
	state: STATE_MACHINE.IDLE,
	error: { code: NaN, message: '' },
};

export const boardsSlice = createSlice({
	name: 'boards',
	initialState,

	reducers: {
		setCurrentBoard: (state, { payload }: PayloadAction<string>) => {
      state.currentBoard = payload;
      state.error = { code: NaN, message: '' };
		},

		closeBoard: state => {
			state.currentBoard = '';
			state.state = STATE_MACHINE.IDLE;
    },
    
		deleteBoard: (state, { payload }: PayloadAction<string>) => {
			Reflect.deleteProperty(state.repos, payload);
			state.currentBoard = '';
			state.state = STATE_MACHINE.IDLE;
		},

		reorderInsideCol: (state, { payload }: PayloadAction<IConfig>) => {
			state.repos[state.currentBoard].columns[payload.title].issues =
				payload.issues;
		},

		reorderBetweenCol: (state, { payload }: PayloadAction<IConfig[]>) => {
			const [source, destination] = payload;
			state.repos[state.currentBoard].columns[source.title].issues =
				source.issues;
			state.repos[state.currentBoard].columns[destination.title].issues =
				destination.issues;
		},
	},

	extraReducers: builder => {
		builder.addCase(fetchIssues.pending, state => {
			state.state = STATE_MACHINE.LOADING;
			state.currentBoard = '';
		});
		builder.addCase(fetchIssues.fulfilled, (state, { payload }) => {
			if (payload) {
				state.repos = {
					...state.repos,
					[payload.request]: {
            columns: {
              // putt all new issues in "to do" column
              ToDo: { title: 'ToDo', issues: payload.data },

              // create "done" column
							Done: { title: 'Done', issues: [] },
              
              // create "in progress" column
							'In Progress': { title: 'In Progress', issues: [], },
						},
						stars: payload.stars,
					},
        };
				state.currentBoard = payload.request;
				state.state = STATE_MACHINE.RESOLVED;
			}
		});
		builder.addCase(fetchIssues.rejected, (state, { payload }) => {
			state.state = STATE_MACHINE.REJECTED;
			state.currentBoard = '';
			if (payload) {
				state.error = { code: payload.code, message: payload.message };
			}
		});
	},
});

export const {
	reorderInsideCol,
	reorderBetweenCol,
	setCurrentBoard,
	deleteBoard,
	closeBoard,
} = boardsSlice.actions;
export default boardsSlice.reducer;
