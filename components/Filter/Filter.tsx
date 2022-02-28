import React, { useState } from "react";
import {
  Container,
  InputGroup,
  Input,
  InputRightElement,
  Button,
  Select,
  Flex,
  Box,
} from "@chakra-ui/react";

import Styles from "./Filter.module.scss";

type FilterTypes = {
  onSearch: (value: string) => void;
  languages: any[];
  onLanguageChange: (value: string) => void;
};

const Filter = ({
  onSearch,
  languages = [],
  onLanguageChange,
}: FilterTypes) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onLanguageChange(e.target.value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = (
    e:
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | React.KeyboardEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <section className={Styles.Filter}>
      <form>
        <Box pb="20" id="filter-form">
          <Container>
            <Flex flexDirection={["column", "column", "row", "row"]}>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                width={["100%", "100%", "70%", "70%"]}
                mr={2}
              >
                <InputGroup maxW={370} size="lg">
                  <Input
                    id="search-input"
                    pr="4.5rem"
                    lineHeight={1}
                    type="text"
                    value={searchTerm}
                    onChange={(e) => handleInputChange(e)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") handleSearch(e);
                    }}
                    placeholder="Find repos by name? 👀"
                  />
                  <InputRightElement width="6.5rem">
                    <Button
                      id="search-button"
                      h="1.75rem"
                      size="md"
                      onClick={(e) => handleSearch(e)}
                    >
                      Search
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </Box>

              <Box
                display="flex"
                justifyContent="center"
                width={["100%", "100%", "30%", "30%"]}
              >
                <InputGroup maxW={370} size="lg">
                  <Select id="language-select" size="lg" onChange={handleLanguageChange}>
                    <option value="all">All languages</option>
                    {languages.map((language) => {
                      if (language.name == null) return null;
                      return (
                        <option key={language.name} value={language.name}>
                          {language.name}
                        </option>
                      );
                    })}
                  </Select>
                </InputGroup>
              </Box>
            </Flex>
          </Container>
        </Box>
      </form>
    </section>
  );
};

export default Filter;
