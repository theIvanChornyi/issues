import axios from 'axios';
import { IRepoURI, IResponse } from 'modules/shared/types/github-api.types';
import {
  BASE_GITHUB_URL,
  GITHUB_API_ENDPOINTS,
  GITHUB_API_URL,
} from '../const/backend.const';

class GithubApi {
  private _baseUrl = GITHUB_API_URL;

  public static parseRepoURI = (url: string): IRepoURI => {
    const [owner, repoName] = url.replace(BASE_GITHUB_URL, '').split('/');
    return { owner, repoName };
  };

  constructor() {
    axios.defaults.baseURL = this._baseUrl;
  }

  public getIssues = async (req: IRepoURI): Promise<IResponse[]> => {
    const { owner, repoName } = req;
    const { data, status } = await axios({
      method: 'get',
      url: `${owner}/${repoName}/${GITHUB_API_ENDPOINTS.ISSUES}`,
      params: {
        state: 'open',
        per_page: 50,
      },
    });
    return Object.assign(data, status);
  };
  public getStargazers = async (req: IRepoURI): Promise<number> => {
    const { owner, repoName } = req;
    const { data } = await axios({
      method: 'get',
      url: `${owner}/${repoName}`,
    });
    return data.stargazers_count;
  };
}

export default GithubApi;
