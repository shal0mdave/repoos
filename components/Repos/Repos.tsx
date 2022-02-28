import { useEffect, useState } from "react";
import {
  Container,
  SimpleGrid,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Badge,
} from "@chakra-ui/react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { RepoType } from "../../types";
import moment from "moment";

import { RootState, AppDispatch } from "../../redux/store/store";
import { getGithubRepos } from "../../redux/slices/githubRepo.slice";
import {
  returnLanguageOptions,
  returnReposByLanguages,
} from "../../utils/filters.util";
import { loadStore, saveStore } from "../../utils/localStorage.util";
import { Filter, RepoItem } from "../";

const Repos = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { repos, loading } = useSelector(
    (state: RootState) => state.githubRepos
  );
  const [params, setParams] = useState({
    q: `created:>${moment().subtract(7, "d").format("YYYY-MM-DD")}`,
    sort: "stars",
    order: "desc",
  });
  const [favourites, setFavourites] = useState<RepoType[]>([]);
  const [language, setLanguage] = useState<string>("all");

  useEffect(() => {
    const getRepos = async () => {
      dispatch(getGithubRepos(params))
        .unwrap()
        .then(() => {})
        .catch((err: any) => {
          console.log(err);
          toast.error(err.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    };
    getRepos();

    const loadFavourites = async () => {
      const fav = await loadStore("favouriteRepos");
      setFavourites(fav || []);
    };
    loadFavourites();
  }, [dispatch, params]);

  const onLanguageChange = (value: string) => setLanguage(value);

  const onFavouriteChange = (data: RepoType[]) => {
    saveStore("favouriteRepos", data);
    setFavourites(data);
  };

  return (
    <section>
      <Filter
        onSearch={(search: string) => console.log(search)}
        languages={returnLanguageOptions(repos)}
        onLanguageChange={onLanguageChange}
      />

      <Container maxWidth={1300} paddingBottom="20">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <Tabs isLazy>
            <TabList>
              <Tab>All Repos</Tab>
              <Tab>
                Your Favourites <Badge ml="1">{favourites.length}</Badge>
              </Tab>
            </TabList>
            <TabPanels pt="20">
              <TabPanel>
                {repos.length > 0 ? (
                  <SimpleGrid columns={[1,2,3,4]} gap={6} flexDirection={["column", "column", "column", "row"]}>
                    {returnReposByLanguages({ language, repos }).map(
                      (repo: RepoType) => (
                        <RepoItem
                          key={repo.id}
                          data={repo}
                          favourites={favourites}
                          onFavourite={onFavouriteChange}
                        />
                      )
                    )}
                  </SimpleGrid>
                ) : (
                  <div>No Repos Found</div>
                )}
              </TabPanel>

              <TabPanel>
                {favourites.length > 0 ? (
                  <SimpleGrid columns={[1,2,3,4]} gap={6}>
                    {returnReposByLanguages({ language, repos: favourites }).map(
                      (repo: RepoType) => (
                        <RepoItem
                          key={repo.id}
                          data={repo}
                          favourites={favourites}
                          onFavourite={onFavouriteChange}
                        />
                      )
                    )}
                  </SimpleGrid>
                ) : (
                  <div>No favourites added</div>
                )}
              </TabPanel>
            </TabPanels>
          </Tabs>
        )}
      </Container>
    </section>
  );
};

export default Repos;
