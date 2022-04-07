import React, {useMemo} from 'react';
import Box from '@components/layouts/Box';
import useStyles from '@lib/themes/useStyles';
import ThemeStyles from '@configs/themes/styles';
import Text from '@components/Text';
import useSchemeValue from '@lib/themes/useSchemeValue';
import {StyleProp, View, ViewStyle} from 'react-native';

interface Props {
  style?: StyleProp<ViewStyle>;
  children: ((data: {textColor: string}) => JSX.Element) | JSX.Element | string;
}

const _styles = {
  container: {
    ...ThemeStyles.card_body_content,
  },
};

const CardBody: React.FC<Props> = ({children, style}) => {
  const styles = useStyles(_styles);
  const cardColor = useSchemeValue('CARD.primary');
  const content = useMemo(() => {
    if (typeof children === 'string') {
      return <Text color={cardColor.text.color}>{children}</Text>;
    }
    if (typeof children === 'function') {
      return children({textColor: cardColor.text.color});
    }
    if (typeof children === 'object') {
      return React.cloneElement(children, {color: cardColor.text.color});
    }
    return <View />;
  }, [children, cardColor]);

  return <Box style={[styles.container, style]}>{content}</Box>;
};

export default CardBody;
