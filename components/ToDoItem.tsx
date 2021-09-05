import { ListItem, ListItemText } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Checkbox from "@material-ui/core/Checkbox";
import {
  ToDo,
  useDeleteToDoMutationMutation,
  useUpdateDoneMutation,
} from "../generated/graphql";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";

interface Props {
  todo: ToDo;
}

function ToDoItem({ todo: { id, task, done } }: Props) {
  const [, setDone] = useUpdateDoneMutation();
  const [, remove] = useDeleteToDoMutationMutation();

  return (
    <ListItem>
      <FormControlLabel
        control={
          <ListItemIcon>
            <Checkbox
              checked={done}
              onChange={() => setDone({ id, done: !done })}
            />
          </ListItemIcon>
        }
        label={<ListItemText primary={task} />}
      />
      <ListItemSecondaryAction>
        <IconButton onClick={() => remove({ id })}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export default ToDoItem;
