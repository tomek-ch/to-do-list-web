import { List, ListItem, ListItemText } from "@material-ui/core";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Checkbox from "@material-ui/core/Checkbox";
import { ToDo } from "../generated/graphql";

interface Props {
  todo: ToDo;
}

function ToDoItem({ todo: { task, done } }: Props) {
  return (
    <List>
      <ListItem>
        <ListItemIcon>
          <Checkbox checked={done} />
        </ListItemIcon>
        <ListItemText>{task}</ListItemText>
      </ListItem>
    </List>
  );
}

export default ToDoItem;
