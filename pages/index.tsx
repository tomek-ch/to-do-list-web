import type { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { useToDosQuery } from "../generated/graphql";

const Home: NextPage = () => {
  return <h1>hello</h1>;
};

export default withUrqlClient(() => ({
  url: "http://localhost:4000/graphql",
}))(Home);
