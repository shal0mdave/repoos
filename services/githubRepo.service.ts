import { githubAxiosInstance } from "../utils/axios.util";
import { GetGithubRepoRequestType } from "../types";

class GithubRepoService {
  getRepos = async (params: GetGithubRepoRequestType): Promise<any> => {
    return await githubAxiosInstance.get("/search/repositories", {
      params,
    });
  };
}

export default new GithubRepoService();
