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
      background: 'transparent',
      border: COLORS.grayscale200,
      text: {
        color: COLORS.blue3,
      },
      icon: {
        color: COLORS.blue3,
      },
    },
  },
  CARD: {
    primary: {
      background: '#ffffff',
      shadowColor: '#ffffff',
      border: 'transparent',
      separator: COLORS.grayscale200,
      text: {
        color: '#000000',
      },
    },
  },
  BACKGROUND: {
    primary: COLORS.blue5,
  },
  TEXT: {
    primary: '#FFFFFF',
    text1: '#ffffff',
    text2: COLORS.grayscale400,
    text3: COLORS.grayscale400,
  },
  INPUT: {
    icon: COLORS.grayscale300,
    border: COLORS.grayscale700,
    border_error: '#ff6060',
    border_valid: COLORS.blue1,
    text: COLORS.grayscale300,
    placeholder: COLORS.grayscale300,
    label: 'rgb(185,185,185)',
    label_error: '#ff6060',
    hint: 'rgb(185,185,185)',
    hint_error: '#ff6060',
  },
  CHECKBOX: {
    primary: {
      disabled: {
        background: COLORS.grayscale700,
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
        background: COLORS.blue4,
      },
      inactive: {
        background: COLORS.stroke,
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
      text: '#ffffff',
      background: '#ffffff',
    },
  },
  DATETIMEPICKER: {
    primary: {
      text: '#ffffff',
    },
  },
};
