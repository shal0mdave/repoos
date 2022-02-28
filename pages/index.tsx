import { Fragment } from "react";
import type { NextPage } from "next";

import { Seo, Hero, Repos } from "../components";

const Home: NextPage = () => {
  return (
    <Seo>
      <Fragment>
        <Hero />
        <Repos />
      </Fragment>
    </Seo>
  );
};

export default Home;
