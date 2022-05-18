import { Alert, Grid, Snackbar } from "@mui/material"
import React, { useState } from "react"
import "../App.css"
import { sendTask, sendWeather } from "../signalr"
import CitySelector from "./CitySelector"
import FormDialog from "./FormDialog"
import WeatherCard from "./WeatherCard"

export default function TestGrid() {
  const [city, setCity] = useState<string>("")

  const [pathImg, setPathImg] = useState<any>("")
  const [weather, setWeather] = useState("")

  const [open, setOpen] = useState(false)
  const [snackbarContent, setSnackbarContent] = useState("")

  const [task, setTask] = useState("")

  const handleAddTask = async (newTask: string) => {
    try {
      await sendTask(newTask)
      setSnackbarContent(`Your task : "${newTask}" has been sended`)
      setTask(newTask)
    } catch (e) {
      setSnackbarContent(`Unable to send task : "${newTask}"`)
      console.error(e)
    }
    finally {
      setOpen(true)
    }
  }

  const handleSetCity = (newCity: string) => {
    setCity(newCity)
  }

  const handleSetImgPath = (path: string | any) => {
    setPathImg(path)
  }

  const handleClose = () => {
    setOpen(false)
  }

  function getSentenceByWeatherCode(code: string) {
    switch (code) {
      case "01":
        return "sunny"
      case "02":
        return "sunny"
      case "03":
        return "cloudy"
      case "04":
        return "cloudy"
      case "09":
        return "rainy"
      case "10":
        return "rainy"
      case "11":
        return "rainy"
      case "13":
        return "snowy"
      case "50":
        return "cloudy"
      default:
        return "no data"
    }
  }

  const setReceivedWeather = async (receivedWeather: string) => {
    const sentenceWeather: string = getSentenceByWeatherCode(receivedWeather)
    setWeather(sentenceWeather)
    // await window.electron.ipcRenderer.sendWeather(sentenceWeather);
    sendWeather(sentenceWeather)
  }

  return (
    <>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} md={12}>
          <div>
            <h2
              style={{
                textAlign: "center",
              }}
            >
              Tasks list
            </h2>
            <FormDialog addTask={handleAddTask} />
            <p>Last Tak: {task}</p>
            <Snackbar
              open={open}
              autoHideDuration={6000}
              onClose={handleClose}
              // message={snackbarContent}
            >
              <Alert
                onClose={handleClose}
                severity="success"
                sx={{ width: "100%" }}
              >
                {snackbarContent}
              </Alert>
            </Snackbar>
          </div>
        </Grid>
        <Grid item xs={12} md={12}>
          <CitySelector
            city={city}
            pathImg={pathImg}
            setCity={handleSetCity}
            setPathImg={handleSetImgPath}
            setWeather={setReceivedWeather}
          />
          {pathImg !== "" && (
            <WeatherCard city={city} imgSrc={pathImg} weather={weather} />
          )}
        </Grid>
      </Grid>
    </>
  )
}
