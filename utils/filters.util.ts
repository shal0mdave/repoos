import { RepoType } from "../types";

export const returnReposByLanguages = ({
  language,
  repos,
}: {
  language: string;
  repos: RepoType[];
}) => {
  if (language === "all") return repos;

  return (repos.filter((repo) => repo.language === language) || []);
};

export const returnLanguageOptions = (repos: RepoType[]) => {
  let languageArray = repos
    .map((repo) => repo.language)
    .filter((value, index, self) => self.indexOf(value) === index);

  return languageArray.map((language) => ({
    name: language,
    value: language,
  }));
};
