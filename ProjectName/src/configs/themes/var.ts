import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export const REM_SIZE: number = 8;
export const SCALE_FACTOR_W: number = width / 450;
export const SCALE_FACTOR_H: number = height / 950;
export const BOTTOM_TAB_HEIGHT: number = 50;
export const INTERPOLATE_COLOR_DURATION: number = 200;
export const COLORS: {[key: string]: string} = {
  primary: '#fd6654',
  accent: '#45ffaa',
  error: '#e74c3c',
  background: '#F8F8F8',
  background_start: '#FD7292',
  background_end: '#FD5E2C',
  text: '#4E5969',
  secondaryColor: '#ffffff',
  grayscale50: '#FAFAFA',
  grayscale100: '#F5F5F5',
  grayscale200: '#E8E8E8',
  grayscale300: '#D6D6D6',
  grayscale400: '#B8B8B8',
  grayscale500: '#A6A6A6',
  grayscale600: '#7A7A7A',
  grayscale700: '#454545',
  grayscale800: '#292929',
  grayscale900: '#121212',
  blue1: '#4D6EFD',
  blue2: '',
  blue3: '#F5F7FB',
  blue4: '#1E293B',
  blue5: '#121826',
  stroke: '#334155',
};
export const HEADER_HEIGHT: number = 50;
