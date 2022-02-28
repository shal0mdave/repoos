// Github Types
export type GetGithubRepoRequestType = {
  q: string;
  sort: string;
  order?: string;
  per_page?: number;
  page?: number;
};

export type RepoType = {
  id: number;
  name: string;
  full_name: string;
  owner: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
  html_url: string;
  clone_url: string;
  description: string;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  default_branch: string;
  open_issues_count: number;
  language: string | null;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  license: {
    name: string;
    key: string;
    url: string;
  };
};
