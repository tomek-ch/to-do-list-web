import { useState } from "react";
import { useCreateToDoMutation } from "../generated/graphql";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import TextField from "@material-ui/core/Input";
import Box from "@material-ui/core/Box";

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
      <Box display="flex">
        <TextField
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="New task"
          fullWidth
        />
        <IconButton type="submit" disabled={!task}>
          <AddIcon />
        </IconButton>
      </Box>
    </form>
  );
}

export default NewToDoForm;
