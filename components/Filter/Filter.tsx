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

const Filter = ({ onSearch, languages = [], onLanguageChange }: FilterTypes) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onLanguageChange(e.target.value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
};

  const handleSearch = (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.KeyboardEvent<HTMLInputElement>) => {
    onSearch(searchTerm);
  }

  return (
    <section className={Styles.Filter}>
      <Box pb="20">
        <Container>
          <Flex justify="space-between" flexDirection={["column", "column", "row", "row"]}>
            <Box>
              <InputGroup minW={370} size="lg">
                <Input
                  pr="4.5rem"
                  type="text"
                  value={searchTerm}
                  onChange={(e) => handleInputChange(e)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") handleSearch(e);
                  }}
                  placeholder="Looking for a repo? 👀"
                />
                <InputRightElement width="6.5rem">
                  <Button h="1.75rem" size="md" onClick={(e) => handleSearch(e)}>
                    Search
                  </Button>
                </InputRightElement>
              </InputGroup>
            </Box>

            <Box>
              <Select size="lg" onChange={handleLanguageChange}>
                <option value="all">All languages</option>
                {languages.map((language) => {
                    if(language.name == null) return null;
                    return (
                        <option key={language.name} value={language.name}>
                            {language.name}
                        </option>
                    );
                })}
              </Select>
            </Box>
          </Flex>
        </Container>
      </Box>
    </section>
  );
};

export default Filter;
