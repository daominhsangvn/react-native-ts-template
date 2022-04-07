import {COLORS} from './var';
import {TThemeColor} from '@configs/themes/types';

export default <TThemeColor>{
  BUTTON: {
    primary: {
      background: COLORS.blue1,
      border: COLORS.blue1,
      text: {
        color: '#ffffff',
      },
      icon: {
        color: '#ffffff',
      },
    },
    link: {
      text: {
        color: COLORS.blue1,
      },
    },
    disabled: {
      background: COLORS.grayscale600,
      border: COLORS.grayscale600,
      text: {
        color: COLORS.grayscale200,
      },
      icon: {
        color: COLORS.grayscale200,
      },
    },
    transparent: {
      background: 'transparent',
      border: 'transparent',
      text: {
        color: COLORS.grayscale200,
      },
      icon: {
        color: COLORS.grayscale200,
      },
    },
    btn1: {
      background: 'white',
      border: COLORS.grayscale200,
      text: {
        color: COLORS.grayscale800,
      },
      icon: {
        color: COLORS.grayscale800,
      },
    },
  },
  CARD: {
    primary: {
      background: COLORS.grayscale100,
      shadowColor: '#000',
      border: 'transparent',
      separator: COLORS.grayscale300,
      text: {
        color: COLORS.grayscale700,
      },
    },
  },
  BACKGROUND: {
    primary: '#ffffff',
  },
  TEXT: {
    primary: COLORS.grayscale800,
    text1: COLORS.grayscale800,
    text2: COLORS.grayscale600,
    text3: COLORS.grayscale500,
  },
  INPUT: {
    icon: COLORS.grayscale600,
    border: COLORS.grayscale200,
    border_error: 'rgb(224,0,0)',
    border_valid: COLORS.blue1,
    text: COLORS.grayscale800,
    placeholder: COLORS.grayscale500,
    label: 'rgba(53, 64, 82, 1)',
    label_error: 'rgb(224,0,0)',
    hint: 'rgba(53, 64, 82, 1)',
    hint_error: 'rgb(224,0,0)',
  },
  CHECKBOX: {
    primary: {
      disabled: {
        background: COLORS.grayscale500,
        border: '#bbbbbb',
      },
      uncheck: {
        background: COLORS.grayscale200,
        border: '#FFFFFF',
      },
      checked: {
        background: COLORS.blue1,
        border: COLORS.blue1,
      },
      icon: {
        color: '#ffffff',
      },
    },
  },
  SWITCH: {
    primary: {
      active: {
        background: COLORS.blue3,
      },
      inactive: {
        background: COLORS.grayscale200,
      },
      circle: {
        active: {
          background: COLORS.blue1,
        },
        inactive: {
          background: '#ffffff',
        },
      },
    },
  },
  NAVBAR: {
    background: '#cccccc',
  },
  SELECT: {
    primary: {
      selected: {
        text: '#0091ff',
        background: '#edf9ff',
      },
      text: '#2c2c2c',
      background: '#ffffff',
    },
  },
  DATETIMEPICKER: {
    primary: {
      text: '#2c2c2c',
    },
  },
};
