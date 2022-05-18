import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { data, getTownData } from '../api';
import { getIconWeather } from './utils';

interface CityProps {
  city: any | string;
  pathImg: any | string;
  setCity: Function;
  setPathImg: Function;
  setWeather: Function;
}

export default function CitySelector(props: CityProps) {
  const handleChange = async (dataItem: any, index: any) => {
    const weatherIcon = await getTownData(index.key.slice(2, index.key.length));
    props.setWeather(weatherIcon);
    props.setCity(dataItem.target.value);
    props.setPathImg(getIconWeather(weatherIcon));
  };

  return (
    <>
      <h2 style={{ textAlign: 'center' }}>Select a city weather</h2>
      <div
        style={{
          marginBottom: 15,
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
              City
            </InputLabel>
            <Select
              labelId="cityLabel"
              id="city"
              value={props.city}
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
        {/* {props.pathImg != '' && (
          <img
            id="weatherImg"
            alt="weather"
            src={props.pathImg}
            style={{ height: 60, width: 80, paddingLeft: 20 }}
          />
        )} */}
      </div>
    </>
  );
}
