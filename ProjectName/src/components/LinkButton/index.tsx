import React from 'react';
import {
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import {mergeStyles} from '@lib/utils/helpers';
import useSchemeValue from '@lib/themes/useSchemeValue';
import ThemeStyles from '@configs/themes/styles';
import {IButtonTheme} from '@configs/themes/types';

interface Props {
  textStyle?: TextStyle;
}

const LinkButton: React.FC<Props & TouchableOpacityProps> = ({
  children,
  textStyle,
  style,
  ...rest
}) => {
  const linkButtonColor = useSchemeValue<IButtonTheme>('BUTTON.link');

  return (
    <TouchableOpacity {...rest} style={mergeStyles({}, style)}>
      {typeof children === 'string' && (
        <Text
          style={mergeStyles(
            ThemeStyles.btn_link,
            {color: linkButtonColor.text?.color},
            textStyle,
          )}>
          {children}
        </Text>
      )}
      {typeof children !== 'string' && children}
    </TouchableOpacity>
  );
};

export default LinkButton;
