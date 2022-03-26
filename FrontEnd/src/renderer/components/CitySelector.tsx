import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useState } from 'react';
import { data, getTownData } from './ApiMeteo';
import { getIconWeather } from './utils';

export default function CitySelector(this: any) {
  const [city, setCity] = useState<string>('');

  const [pathImg, setPathImg] = useState<any>('');

  const handleChange = async (dataItem: any, index: any) => {
    const weatherIcon = await getTownData(index.key.slice(2, index.key.length));
    setCity(dataItem.target.value);
    setPathImg(getIconWeather(weatherIcon));
  };

  return (
    <>
      <h2 style={{ textAlign: 'center' }}>Choix de la météo d'une ville</h2>
      <div
        className="weatherSelectorContainer vertical-center"
        style={{
          position: 'relative',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -100%)',
          paddingLeft: 100,
          paddingRight: 100,
        }}
      >
        <FormControl
          fullWidth
          style={{
            justifyContent: 'center',
          }}
        >
          <div className="select vertical-center">
            <InputLabel
              id="city-select-label"
              style={{
                justifyContent: 'center',
              }}
            >
              Ville
            </InputLabel>
            <Select
              labelId="cityLabel"
              id="city"
              value={city}
              label="city"
              onChange={(dataItem, index) => handleChange(dataItem, index)}
              style={{ width: '100%' }}
            >
              {data.map((d) => {
                return (
                  <MenuItem key={d.name} value={d.name}>
                    {d.name}
                  </MenuItem>
                );
              })}
            </Select>
          </div>
        </FormControl>
        {pathImg != '' && (
          <img
            id="weatherImg"
            alt="weather"
            src={pathImg}
            style={{ height: 60, width: 80, paddingLeft: 20 }}
          />
        )}
      </div>
    </>
  );
}
