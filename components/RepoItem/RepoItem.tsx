import { Box, Heading, Text, Badge, Image, Tooltip, Button } from "@chakra-ui/react";
import { StarIcon, ExternalLinkIcon, AddIcon, DeleteIcon } from "@chakra-ui/icons";

import { RepoType } from "../../types";
import Styles from "./RepoItem.module.scss";


type RepoItemTypes = { 
  data: RepoType; 
  favourites: RepoType[];
  onFavourite: (data: RepoType[]) => void;
};

const RepoItem = ({ data, favourites, onFavourite }: RepoItemTypes) => {
  const starCount = (stars: number) => {
    if (stars > 1000) {
      return `${(stars / 1000).toFixed(1)}k`;
    }
    return stars;
  };

  const checkFavourite = () =>  favourites.find((fav: RepoType) => fav.id === data.id) ? true : false;

  const onHandleFavourite = () => {
    if (checkFavourite()) {
      const newFavourites = favourites.filter((fav: RepoType) => fav.id !== data.id);
      onFavourite(newFavourites);
    }else{
      onFavourite([...favourites, data]);
    }
  };

  return (
    <Box
      border="2px"
      borderColor="blue.50"
      w="100%"
      h="60"
      bg={checkFavourite() ? "green.50" : "blue.50"}
      className={Styles.RepoItem}
    >
      <Box>
        <Tooltip hasArrow label={data.language?"Programming language":"No language detected"} bg="gray.300" color="black">
          <Badge px="2" bg="whiteAlpha.600" className={Styles.RepoLanguageBadge}>
            {data.language || "⚠️"}
          </Badge>
        </Tooltip>
        <a href={data.html_url} target="_blank" rel="noopener noreferrer">
          <Tooltip hasArrow label="View on Github" bg="gray.300" color="black">
            <Badge px="2" bg="whiteAlpha.600" className={Styles.RepoLinkBadge}>
              <ExternalLinkIcon />
            </Badge>
          </Tooltip>
        </a>

        <Box className={Styles.RepoItemInner}>
          <Box className={Styles.RepoItemStarCount}>
            <StarIcon className={Styles.StarIcon} w={3} h={3} />
            <Text>{starCount(data.stargazers_count)}</Text>
          </Box>

          <Heading
            as="h2"
            size="sm"
            fontWeight="600"
            mb="20"
            noOfLines={2}
            className={Styles.RepoItemHeading}
          >
            {data.description || "No project description"}
          </Heading>

          <Box
            className={Styles.RepoItemUser}
            display="flex"
            alignItems="center"
          >
            <Image
              borderRadius="full"
              mr="2"
              boxSize="30px"
              className={Styles.RepoItemUserImage}
              src={data.owner.avatar_url}
              alt={data.owner.login}
            />
            <Text>{data.owner.login}</Text>
          </Box>
        </Box>

        <Box 
          display="flex" 
          flexDirection="column"
          alignItems="center"
          className={Styles.RepoItemActionInner}>
          <Heading
            textAlign="center"
            as="h4"
            size="lg"
            fontWeight="600"
            mb="5"
          >
            {checkFavourite()?"Remove from favourites":"Add to favourites"}
          </Heading>
          <Button 
            size="md" mb="30"
            onClick={onHandleFavourite}
            >
              {checkFavourite()?
              <DeleteIcon />:
              <AddIcon />}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default RepoItem;
