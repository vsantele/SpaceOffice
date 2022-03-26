import { Button, Checkbox, Grid } from '@mui/material';
import CitySelector from './CitySelector';
import FormDialog from './FormDialog';
import useArray from './useArray';

export default function Task() {
  const {
    items: tasks,
    addItem: addTask,
    updateItem: updateTask,
    removeItem: deleteTask,
  } = useArray<string>();

  const {
    items: tasksToDelete,
    addItem: addTaskToDelete,
    removeItem: removeTaskToDelete,
  } = useArray<string>();

  const handleDelete = () => {
    for (let i = 0; i < tasksToDelete.length; i++) {
      deleteTask(tasksToDelete[i]);
      removeTaskToDelete(tasksToDelete[i]);
    }
  };
  return (
    <div>
      <div
        style={{
          height: '200px',
        }}
      >
        <CitySelector />
      </div>
      <h2
        style={{
          textAlign: 'center',
        }}
      >
        Liste des Tâches
      </h2>
      <FormDialog addTask={addTask} />
      {tasks.length > 0 && (
        <Grid item xs={12} md={12}>
          <ul>
            {tasks.map((element) => (
              <li key={element}>
                <Checkbox onClick={() => addTaskToDelete(element)} />
                {element}
              </li>
            ))}
          </ul>
        </Grid>
      )}
      {tasksToDelete.length > 0 && (
        <Button variant="outlined" onClick={handleDelete}>
          Delete
        </Button>
      )}
    </div>
  );
}
