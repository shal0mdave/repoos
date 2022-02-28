import { useEffect, useState, Fragment } from "react";
import { Container, SimpleGrid, Tabs, TabList, Tab, TabPanels, TabPanel, Badge, Text, Box } from "@chakra-ui/react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { RepoType, GetGithubRepoRequestType } from "../../types";
import moment from "moment";

import { RootState, AppDispatch } from "../../redux/store/store";
import { getGithubRepos } from "../../redux/slices/githubRepo.slice";
import { returnLanguageOptions, returnReposByLanguages } from "../../utils/filters.util";
import { loadStore, saveStore } from "../../utils/localStorage.util";
import { Filter, RepoItem } from "../";

const Repos = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { repos, loading } = useSelector(
    (state: RootState) => state.githubRepos
  );

  const initialParams = {
    q: `created:>${moment().subtract(7, "d").format("YYYY-MM-DD")}`,
    sort: "stars",
    order: "desc",
    per_page: 56,
  };
  const [params, setParams] = useState<GetGithubRepoRequestType>(initialParams);
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

  const onSearch = (searchTerm: string) => {
    if (searchTerm.length == 0) {
      setParams(initialParams);
    } else {
      setParams({
        ...params,
        q: `${searchTerm} in:name ${searchTerm} in:des ${params.q}`,
      });
    }
  };

  return (
    <section>
      <Filter
        onSearch={(search: string) => onSearch(search)}
        languages={returnLanguageOptions(repos)}
        onLanguageChange={onLanguageChange}
      />

      <Container maxWidth={1300} paddingBottom="20">

          <Tabs>
            <TabList>
              <Tab>All Repos</Tab>
              <Tab>
                Your Favourites <Badge ml="1">{favourites.length}</Badge>
              </Tab>
            </TabList>
            <TabPanels pt="20">
              <TabPanel>
                {loading? (
                  <div>Loading...</div>
                ) : (
                  repos.length > 0 ? (
                    <Fragment>
                      <SimpleGrid
                        columns={[1, 2, 3, 4]}
                        gap={6}
                        flexDirection={["column", "column", "column", "row"]}
                      >
                        {returnReposByLanguages({ language, repos }).map((repo: RepoType) => (
                            <RepoItem
                              key={repo.id}
                              data={repo}
                              favourites={favourites}
                              onFavourite={onFavouriteChange}
                            />
                        ))}
                      </SimpleGrid>
                    </Fragment>
                  ) : (
                    <Box>
                      <Text>No Repos Found</Text>
                    </Box>
                  )
                )}
              </TabPanel>
              <TabPanel>
                {favourites.length > 0 ? (
                  <SimpleGrid columns={[1, 2, 3, 4]} gap={6}>
                    {returnReposByLanguages({
                      language: "all",
                      repos: favourites,
                    }).map((repo: RepoType) => (
                      <RepoItem
                        key={repo.id}
                        data={repo}
                        favourites={favourites}
                        onFavourite={onFavouriteChange}
                      />
                    ))}
                  </SimpleGrid>
                ) : (
                  <Box>
                    <Text>No favourites added</Text>
                  </Box>
                )}
              </TabPanel>
            </TabPanels>
          </Tabs>
      </Container>
    </section>
  );
};

export default Repos;
