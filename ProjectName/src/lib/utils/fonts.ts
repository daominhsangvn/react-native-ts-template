import {Platform} from 'react-native';
import merge from 'lodash/merge';

type FontWeightType =
  | 'normal'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900'
  | 'bold';

interface IFontWeight {
  fontFamily: string;
  fontWeight: FontWeightType;
  fontStyle?: 'italic' | 'normal';
}

export const fontWeight = (weight: FontWeightType, italic: boolean = false) => {
  switch (weight) {
    case '100':
      return Platform.OS === 'ios'
        ? (merge(
            {fontFamily: 'Nunito', fontWeight: weight},
            italic && {fontStyle: 'italic'},
          ) as IFontWeight)
        : ({fontFamily: 'Nunito_Hairline', fontWeight: weight} as IFontWeight);
    case '200':
      return Platform.OS === 'ios'
        ? (merge(
            {fontFamily: 'Nunito', fontWeight: weight},
            italic && {fontStyle: 'italic'},
          ) as IFontWeight)
        : (merge(
            {fontFamily: 'Nunito-ExtraLight', fontWeight: weight},
            italic && {fontFamily: 'Nunito-ExtraLightItalic'},
          ) as IFontWeight);
    case '300':
      return Platform.OS === 'ios'
        ? (merge(
            {fontFamily: 'Nunito', fontWeight: weight},
            italic && {fontStyle: 'italic'},
          ) as IFontWeight)
        : (merge(
            {fontFamily: 'Nunito-Light', fontWeight: weight},
            italic && {fontFamily: 'Nunito-LightItalic'},
          ) as IFontWeight);
    case 'normal':
    case '400':
      return Platform.OS === 'ios'
        ? (merge(
            {fontFamily: 'Nunito', fontWeight: weight},
            italic && {fontStyle: 'italic'},
          ) as IFontWeight)
        : (merge(
            {fontFamily: 'Nunito-Regular', fontWeight: weight},
            italic && {fontFamily: 'Nunito-Italic'},
          ) as IFontWeight);
    case '500':
      return Platform.OS === 'ios'
        ? (merge(
            {fontFamily: 'Nunito', fontWeight: weight},
            italic && {fontStyle: 'italic'},
          ) as IFontWeight)
        : (merge(
            {fontFamily: 'Nunito-Medium', fontWeight: weight},
            italic && {fontFamily: 'Nunito-MediumItalic'},
          ) as IFontWeight);
    case '600':
      return Platform.OS === 'ios'
        ? (merge(
            {fontFamily: 'Nunito', fontWeight: weight},
            italic && {fontStyle: 'italic'},
          ) as IFontWeight)
        : (merge(
            {fontFamily: 'Nunito-SemiBold', fontWeight: weight},
            italic && {fontFamily: 'Nunito-SemiBoldItalic'},
          ) as IFontWeight);
    case 'bold':
    case '700':
      return Platform.OS === 'ios'
        ? (merge(
            {fontFamily: 'Nunito', fontWeight: weight},
            italic && {fontStyle: 'italic'},
          ) as IFontWeight)
        : (merge(
            {fontFamily: 'Nunito-Bold', fontWeight: weight},
            italic && {fontFamily: 'Nunito-BoldItalic'},
          ) as IFontWeight);
    case '800':
      return Platform.OS === 'ios'
        ? (merge(
            {fontFamily: 'Nunito', fontWeight: weight},
            italic && {fontStyle: 'italic'},
          ) as IFontWeight)
        : (merge(
            {fontFamily: 'Nunito-ExtraBold', fontWeight: weight},
            italic && {fontFamily: 'Nunito-ExtraBoldItalic'},
          ) as IFontWeight);
    case '900':
      return Platform.OS === 'ios'
        ? (merge(
            {fontFamily: 'Nunito', fontWeight: weight},
            italic && {fontStyle: 'italic'},
          ) as IFontWeight)
        : (merge(
            {fontFamily: 'Nunito-Black', fontWeight: weight},
            italic && {fontFamily: 'Nunito-BlackItalic'},
          ) as IFontWeight);
  }
};
