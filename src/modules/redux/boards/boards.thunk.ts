import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import GithubApi from 'modules/shared/services/github-api.service';
import { IResponse } from 'modules/shared/types/github-api.types';
const github = new GithubApi();

interface IData {
	data: IResponse[];
	request: string;
	stars: number;
}

interface IReject {
	rejectValue: { code: number; message: string };
}

export const fetchIssues = createAsyncThunk<IData, string, IReject>(
	'boards/fetchIssues',
	async (request: string, thunkAPI) => {
		try {
			const data = await github.getIssues(GithubApi.parseRepoURI(request));
			if (data.length === 0) {
				return thunkAPI.rejectWithValue({ code: 400, message: 'Issues empty' });
			}
			const stars = await github.getStargazers(GithubApi.parseRepoURI(request));

			return { data, request, stars };
		} catch (e) {
			const err = e as AxiosError;
			return thunkAPI.rejectWithValue({
				code: err.response?.status ? err.response?.status : 400,
				message: err.code ? err.code : 'Bad request',
			});
		}
	}
);
