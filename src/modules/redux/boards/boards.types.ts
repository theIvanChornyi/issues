import { IIssue } from 'modules/shared/types/github-api.types';

export enum STATE_MACHINE {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  RESOLVED = 'RESOLVED',
  REJECTED = 'REJECTED',
}

export interface IError {
  code: number;
  message: string;
}

export interface IConfig {
  title: string;
  issues: IIssue[];
}

export interface IColumns {
  [columnName: string]: IConfig;
}

export interface IRepo {
  columns: IColumns;
  stars: number;
}

export interface IRepos {
  [repoURI: string]: IRepo;
}

export interface IBoardsState {
  currentBoard: string;
  repos: IRepos;
  state: STATE_MACHINE;
  error: IError;
}

export interface AsyncThunkConfig {}
