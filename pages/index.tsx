import { List } from "@material-ui/core";
import type { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { useToDosQuery } from "../generated/graphql";
import ToDoItem from "../components/ToDoItem";
import NewToDoForm from "../components/NewToDoForm";
import { useEffect } from "react";

const Home: NextPage = () => {
  const [{ data }] = useToDosQuery();

  useEffect(() => {
    console.log(data?.ToDos);
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

export default withUrqlClient(() => ({
  url: process.env.NEXT_PUBLIC_SERVER_URL as string,
}))(Home);
