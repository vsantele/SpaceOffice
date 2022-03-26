import { Alert, Grid, Snackbar } from '@mui/material';
import React, { useState } from 'react';
import '../App.css';
import CitySelector from './CitySelector';
import FormDialog from './FormDialog';
import useArray from './useArray';
import WeatherCard from './WeatherCard';

export default function TestGrid() {
  const [city, setCity] = useState<string>('');

  const [pathImg, setPathImg] = useState<any>('');
  const [weather, setWeather] = useState('');

  const [open, setOpen] = useState(false);
  const [snackbarContent, setSnackbarContent] = useState('');

  const {
    items: tasks,
    addItem: addTask,
    removeItem: deleteTask,
  } = useArray<string>();

  const handleAddTask = async (task: string) => {
    addTask(task);
    setOpen(true);
    setSnackbarContent(`Your task : "${task}" has been sended`);
    await window.electron.ipcRenderer.sendTask(task);
  };

  const handleSetCity = (city: string) => {
    setCity(city);
  };

  const handleSetImgPath = (path: string | any) => {
    setPathImg(path);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function setReceivedWeather(receivedWeather: string) {
    var sentenceWeather: string = getSentenceByWeatherCode(receivedWeather);
    setWeather(sentenceWeather);
  }

  function getSentenceByWeatherCode(code: string) {
    switch (code) {
      case '01':
        return 'sunny';
        break;

      case '02':
        return 'sunny';
        break;

      case '03':
        return 'cloudy';
        break;

      case '04':
        return 'cloudy';
        break;

      case '09':
        return 'rainy';
        break;

      case '10':
        return 'rainy';
        break;

      case '11':
        return 'rainy';
        break;

      case '13':
        return 'snowy';
        break;

      case '50':
        return 'cloudy';
        break;

      default:
        return 'no data';
    }
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
          {pathImg != '' && (
            <WeatherCard city={city} imgSrc={pathImg} weather={weather} />
          )}
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
            <Snackbar
              open={open}
              autoHideDuration={6000}
              onClose={handleClose}
              //message={snackbarContent}
            >
              <Alert
                onClose={handleClose}
                severity="success"
                sx={{ width: '100%' }}
              >
                {snackbarContent}
              </Alert>
            </Snackbar>
          </div>
        </Grid>
      </Grid>
    </>
  );
}
