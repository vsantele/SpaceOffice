import { Button, Checkbox, Grid } from '@mui/material';
import React from 'react';
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
  console.log(tasksToDelete.length);
  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} md={12}>
        <h2>Task List</h2>
      </Grid>
      <Grid item xs={12} md={12}>
        <FormDialog addTask={addTask} />
      </Grid>
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
        <Grid item xs={12} md={12}>
          <Button variant="outlined" onClick={handleDelete}>
            Delete
          </Button>
        </Grid>
      )}
    </Grid>
  );
}
