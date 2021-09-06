import { List } from "@material-ui/core";
import type { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { useToDosQuery } from "../generated/graphql";
import ToDoItem from "../components/ToDoItem";
import NewToDoForm from "../components/NewToDoForm";
import { useEffect } from "react";
import createUrqlClient from "../utils/createUrqlClient";

const Home: NextPage = () => {
  const [{ data }] = useToDosQuery();

  useEffect(() => {
    console.log(data?.ToDos.filter(({ done }) => done));
  }, [data]);

  return (
    <>
      <NewToDoForm />
      <List>
        {data?.ToDos.map((todo) => (
          <ToDoItem key={todo.id} todo={todo} />
        ))}
      </List>
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Home);
