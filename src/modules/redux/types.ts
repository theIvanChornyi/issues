import { IIssue } from 'modules/shared/types/github-api.types';
import store from './store.config';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export interface IRepo {
	curRequest: string;
	issues: IIssue[];
}

export interface IRequest {
	curRequest: string;
	requestHistory: string[];
}
