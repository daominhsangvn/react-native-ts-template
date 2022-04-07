import React, {useMemo} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {mergeStyles} from '@lib/utils/helpers';
import useStyles from '@lib/themes/useStyles';
import {TextProps} from 'react-native';
import {IconProps} from 'react-native-vector-icons/Icon';

interface TIconProps extends IconProps {
  Component?: typeof React.Component;
  style?: TextProps;
}

const _styles = {
  icon: {},
};

const Icon: React.FC<TIconProps> = ({
  Component = Ionicons,
  style = {},
  name,
  size,
  color,
}) => {
  const styles = useStyles(_styles);

  const iconStyle = useMemo(
    () => mergeStyles(styles.icon, style),
    [styles.icon, style],
  );

  return useMemo(
    () => <Component style={iconStyle} name={name} size={size} color={color} />,
    [Component, color, iconStyle, name, size],
  );
};

export default Icon;
