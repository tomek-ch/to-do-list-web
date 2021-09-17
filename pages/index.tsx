import { Box, List } from "@material-ui/core";
import type { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { useToDosQuery } from "../generated/graphql";
import ToDoItem from "../components/ToDoItem";
import NewToDoForm from "../components/NewToDoForm";
import { useEffect } from "react";
import createUrqlClient from "../utils/createUrqlClient";

const Home: NextPage = () => {
  const [{ data, error }] = useToDosQuery();

  useEffect(() => {
    console.log(data?.ToDos.filter(({ done }) => done));
  }, [data]);

  return (
    <>
      <NewToDoForm />
      <List>
        {error ? (
          <Box px={2}>Server error</Box>
        ) : (
          data?.ToDos.map((todo) => <ToDoItem key={todo.id} todo={todo} />)
        )}
      </List>
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Home);
