import { Container, Heading, Text, Box } from "@chakra-ui/react";
import Link from "next/link";

import Styles from "./Hero.module.scss";

const Hero = () => {
  return (
    <header className={Styles.Header}>
      <Box pt={10} pb={10}>
        <Container>
          <Box mb={30} textAlign="center">
            <Link href="/">
              <a>RepꙨꙨs 🧑‍🚀</a>
            </Link>
          </Box>

          <Heading as="h2" size="2xl" textAlign="center" marginBottom={5}>
            Your one-stop page for popular repos.
          </Heading>

          <Text mb={10} fontSize="lg" textAlign="center">
           Built with love on React & Next
          </Text>
        </Container>
      </Box>
    </header>
  );
};

export default Hero;
