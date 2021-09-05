import { Button, TextField } from "@material-ui/core";
import { useState } from "react";
import { useCreateToDoMutation } from "../generated/graphql";

function NewToDoForm() {
  const [, createToDo] = useCreateToDoMutation();
  const [task, setTask] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createToDo({ task });
      }}
    >
      <TextField
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="New task"
      />
      <Button type="submit">Add</Button>
    </form>
  );
}

export default NewToDoForm;
