import { Button, Checkbox, Grid } from '@mui/material';
import { useState } from 'react';
import '../App.css';
import CitySelector from './CitySelector';
import FormDialog from './FormDialog';
import useArray from './useArray';
import WeatherCard from './WeatherCard';

export default function TestGrid() {
  const [city, setCity] = useState<string>('');

  const [pathImg, setPathImg] = useState<any>('');
  const [weather, setWeather] = useState('');

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
    await window.electron.ipcRenderer.sendTask(task);
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

  function setReceivedWeather(receivedWeather: string) {
    setWeather(receivedWeather);
  }
  return (
    <>
      <Grid container spacing={2} justifyContent={'center'}>
        <Grid item xs={12} md={6}>
          <CitySelector
            city={city}
            pathImg={pathImg}
            setCity={handleSetCity}
            setPathImg={handleSetImgPath}
            setWeather={setReceivedWeather}
          />
          {pathImg != '' && <WeatherCard city={city} imgSrc={pathImg} />}
        </Grid>
        <Grid item xs={12} md={6}>
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
        </Grid>
      </Grid>
    </>
  );
}
