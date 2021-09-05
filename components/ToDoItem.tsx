import { ListItem, ListItemText } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Checkbox from "@material-ui/core/Checkbox";
import { ToDo } from "../generated/graphql";

interface Props {
  todo: ToDo;
}

function ToDoItem({ todo: { id, task, done } }: Props) {
  return (
    <ListItem>
      <FormControlLabel
        control={
          <ListItemIcon>
            <Checkbox checked={done} />
          </ListItemIcon>
        }
        label={<ListItemText primary={task} />}
      />
    </ListItem>
  );
}

export default ToDoItem;
