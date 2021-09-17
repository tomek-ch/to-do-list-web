import { useState } from "react";
import { useCreateToDoMutation } from "../generated/graphql";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import TextField from "@material-ui/core/Input";
import Box from "@material-ui/core/Box";

function NewToDoForm() {
  const [, createToDo] = useCreateToDoMutation();
  const [task, setTask] = useState("");
  const [error, setError] = useState("");

  return (
    <Box p={2}>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const { error } = await createToDo({ task });

          if (error) {
            console.log(error);
            setError("Server error");
          } else {
            setTask("");
            setError("");
          }
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
      <div>{error}</div>
    </Box>
  );
}

export default NewToDoForm;
