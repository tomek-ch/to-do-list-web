import { List } from "@material-ui/core";
import type { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { useToDosQuery } from "../generated/graphql";
import ToDoItem from "../components/ToDoItem";

const Home: NextPage = () => {
  const [{ data }] = useToDosQuery();
  return (
    <List>
      {data?.ToDos.map((todo) => (
        <ToDoItem key={todo.id} todo={todo} />
      ))}
    </List>
  );
};

export default withUrqlClient(() => ({
  url: process.env.NEXT_PUBLIC_SERVER_URL as string,
}))(Home);
