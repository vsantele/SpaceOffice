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
}

export default function WeatherCard(props: WeatherProps) {
  return (
    <Card>
      <CardHeader title="Weather" />
      <CardMedia
        component="img"
        height="300"
        width="100"
        image={props.imgSrc}
        alt={`Weather of ${props.city}`}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          This the weather of {props.city}
        </Typography>
      </CardContent>
      <CardActions disableSpacing></CardActions>
    </Card>
  );
}
