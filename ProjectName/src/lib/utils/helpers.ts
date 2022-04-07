import {Dimensions} from 'react-native';
import {format, isValid} from 'date-fns';
import Logger from '@lib/utils/Logger';

export const classNames = (...classes: any[]) => {
  return classes.filter(Boolean).join(' ');
};

export const asyncForEach = async (
  array: any[],
  callback: Function,
): Promise<void> => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};

export const parseErrorMessage = (error: any) => {
  Logger.log('parseErrorMessage', error);
  Logger.log('parseErrorMessage message', error.message);
  Logger.log('parseErrorMessage response', error.response);

  if (typeof error === 'string') {
    return error;
  }

  if (typeof error.message === 'object') {
    if (typeof error.message.data === 'string') {
      return error.message.data;
    }
    if (typeof error.message.data === 'object') {
      Logger.log(error.message.data);
      return 'Data object error';
    }

    return error.message.text;
  }
  if (error.response && error.response.data) {
    const {data} = error.response;
    if (typeof data === 'string') {
      return data;
    }
  }

  return error.message;
};

export const mergeStyles = (styles: any, ...otherStyles: any[]) => {
  const normalizeStyles = otherStyles.reduce((p, c) => {
    if (c) {
      if (Array.isArray(c)) {
        p = p.concat(c);
      } else {
        p.push(c);
      }
    }
    return p;
  }, []);

  if (Array.isArray(styles)) {
    styles.push(...normalizeStyles);
    return styles;
    // return [...styles, ...normalizeStyles];
  }

  return [styles, ...normalizeStyles];
};

export const windowWidth: number = Dimensions.get('window').width;

export const windowHeight: number = Dimensions.get('window').height;

export const toFullDate = (date: Date): string => {
  return format(date, 'PP p');
};
export const toShortDate = (date: Date): string => {
  return format(date, 'P');
};
export const toTime = (date: Date): string => format(date, 'p');
export const isDate = (date: Date): boolean => isValid(date);
export const toLongDate = (date: Date): string => format(date, 'PP');
