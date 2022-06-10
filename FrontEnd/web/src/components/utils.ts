import Icon1 from '../assets/icon_weather/01.png';
import Icon2 from '../assets/icon_weather/02.png';
import Icon3 from '../assets/icon_weather/03.png';
import Icon4 from '../assets/icon_weather/04.png';
import Icon9 from '../assets/icon_weather/09.png';
import Icon10 from '../assets/icon_weather/10.png';
import Icon11 from '../assets/icon_weather/11.png';
import Icon13 from '../assets/icon_weather/13.png';
import Icon50 from '../assets/icon_weather/50.png';

export function getIconWeather(icon: string | null) {
  switch (icon) {
    case '01':
      return Icon1;
    case '02':
      return Icon2;
    case '03':
      return Icon3;
    case '04':
      return Icon4;
    case '09':
      return Icon9;
    case '10':
      return Icon10;
    case '11':
      return Icon11;
    case '13':
      return Icon13;
    case '50':
      return Icon50;
    default:
      return null;
  }
}
