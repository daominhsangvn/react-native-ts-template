export interface ICheckBoxColor {
  disabled: {
    background: string;
    border: string;
  };
  uncheck: {
    background: string;
    border: string;
  };
  checked: {
    background: string;
    border: string;
  };
  icon: {
    color: '#ffffff';
  };
}

export interface IButtonColor {
  background?: string;
  border?: string;
  text?: {
    color: string;
  };
  icon?: {
    color: string;
  };
}

export interface ISwitchColor {
  active: {
    background: string;
  };
  inactive: {
    background: string;
  };
  circle: {
    active: {
      background: string;
    };
    inactive: {
      background: string;
    };
  };
}

export interface ISelectColor {
  selected: {
    text: string;
    background: string;
  };
  text: string;
  background: string;
}

export interface TThemeColor {
  BUTTON: {
    [key: string]: IButtonColor;
  };
  CARD: {
    [key: string]: {
      background: string;
      shadowColor: string;
      border: string;
      separator: string;
      text: {
        color: string;
      };
    };
  };
  BACKGROUND: {
    [key: string]: string;
  };
  TEXT: {
    [key: string]: string;
  };
  INPUT: {
    icon: string;
    border: string;
    border_error: string;
    border_valid: string;
    text: string;
    placeholder: string;
    label: string;
    label_error: string;
    hint: string;
    hint_error: string;
  };
  CHECKBOX: {
    [key: string]: ICheckBoxColor;
  };
  SWITCH: {
    [key: string]: ISwitchColor;
  };
  NAVBAR: {
    background: string;
  };
  SELECT: {
    [key: string]: ISelectColor;
  };
  DATETIMEPICKER: {
    [key: string]: {
      text: string;
    };
  };
}
