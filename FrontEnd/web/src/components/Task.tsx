import { Button, Checkbox } from '@mui/material';
import { useState } from 'react';
import { sendTask } from '../signalr';
import FormDialog from './FormDialog';
import useArray from './useArray';

export default function Task() {
  const [city, setCity] = useState<string>('');

  const [pathImg, setPathImg] = useState<any>('');
  const {
    items: tasks,
    addItem: addTask,
    removeItem: deleteTask,
  } = useArray<string>();

  const {
    items: tasksToDelete,
    addItem: addTaskToDelete,
    removeItem: removeTaskToDelete,
  } = useArray<string>();

  const handleAddTask = async (task: string) => {
    addTask(task);
    // await window.electron.ipcRenderer.sendTask(task);
    await sendTask(task);
  };

  const handleSetCity = (city: string) => {
    setCity(city);
  };

  const handleSetImgPath = (path: string | any) => {
    setPathImg(path);
  };

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
          height: '150px',
          marginBottom: '20px',
        }}
      >
        {/* <CitySelector
          city={city}
          pathImg={pathImg}
          setCity={handleSetCity}
          setPathImg={handleSetImgPath}
        /> */}
      </div>
      <div>
        <h2
          style={{
            textAlign: 'center',
          }}
        >
          Tasks list
        </h2>
        <FormDialog addTask={handleAddTask} />
        {tasks.length > 0 && (
          <ul>
            {tasks.map((element) => (
              <li key={element}>
                <Checkbox
                  onClick={() => {
                    if (tasksToDelete.indexOf(element) >= 0) {
                      removeTaskToDelete(element);
                    } else {
                      addTaskToDelete(element);
                    }
                  }}
                />
                {element}
              </li>
            ))}
          </ul>
        )}
        {tasksToDelete.length > 0 && (
          <Button variant="outlined" onClick={handleDelete}>
            Delete
          </Button>
        )}
      </div>
    </div>
  );
}
