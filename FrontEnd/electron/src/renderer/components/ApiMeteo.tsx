interface dataTown {
  name: string;
  latitude: number;
  longitude: number;
}

export const data: dataTown[] = [
  { name: 'Paris', latitude: 48.85686646089005, longitude: 2.3367319128587356 },
  {
    name: 'Bruxelles',
    latitude: 50.84828695727814,
    longitude: 4.352201304266078,
  },
  {
    name: 'Londres',
    latitude: 51.50706276830083,
    longitude: -0.126184657623294,
  },
  {
    name: 'New York',
    latitude: 40.6642201680235,
    longitude: -74.11770536328847,
  },
  {
    name: 'Abu Dhabi',
    latitude: 24.409609936619262,
    longitude: 54.474675113167315,
  },
  { name: 'Moscou', latitude: 55.750526478812446, longitude: 37.6206085811659 },
  { name: 'Tokyo', latitude: 35.68071888577777, longitude: 139.76030970234115 },
  {
    name: 'Toronto',
    latitude: 43.684655078028406,
    longitude: -79.39857774063725,
  },
  { name: 'Rome', latitude: 41.88821722190577, longitude: 12.487155530213544 },
];

export const getTownData = async (name:string) => {
    let weatherdata;
    let index = 0;
    for(let i=0;i<data.length;i++) {
        if(data[i].name==name)index=i;
    }
    console.log(index);
    try {
      let response = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?lat=${data[index].latitude}&lon=${data[index].longitude}&appid=892f21c3d0a36c71c29fbae2587d4f10&units=metric`
      );

      weatherdata = await response.json();
    } catch (error) {
      console.log('Erreur ' + error);
    }
  return weatherdata.weather[0].icon.slice(0, -1);
};
