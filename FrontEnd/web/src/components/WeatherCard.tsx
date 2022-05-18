import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import * as React from 'react';

interface WeatherProps {
  city: string;
  imgSrc: string;
  weather: string;
}

export default function WeatherCard(props: WeatherProps) {
  return (
    <Card>
      <CardHeader title="Weather" />
      <CardMedia
        component="img"
        height="300"
        image={props.imgSrc}
        alt={`Weather of ${props.city}`}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          The weather of {props.city} : it is <b>{props.weather}</b>
        </Typography>
      </CardContent>
      <CardActions disableSpacing></CardActions>
    </Card>
  );
}
