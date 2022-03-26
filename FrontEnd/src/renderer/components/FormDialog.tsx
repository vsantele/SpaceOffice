import { TextField } from '@mui/material/';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';

interface DialogProps {
  addTask: (tasks: string) => void;
}

export default function FormDialog(props: DialogProps) {
  const [open, setOpen] = React.useState(false);
  const [task, setTask] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addTask = () => {
    if (task !== '') {
      props.addTask(task);
      handleClose();
    }
  };
  return (
    <div
      style={{
        justifyContent: 'center',
      }}
    >
      <Box sx={{ mx: 'auto' }}>
        {' '}
        <Button
          style={{
            textAlign: 'center',
          }}
          variant="outlined"
          onClick={handleClickOpen}
        >
          Add task
        </Button>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Task name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setTask(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={addTask}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
