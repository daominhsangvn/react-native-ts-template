import React, {useMemo} from 'react';
import Box from '@components/layouts/Box';
import useStyles from '@lib/themes/useStyles';
import ThemeStyles from '@configs/themes/styles';
import useSchemeValue from '@lib/themes/useSchemeValue';
import Text from '@components/Text';
import {StyleProp, View, ViewStyle} from 'react-native';

interface Props {
  style?: StyleProp<ViewStyle>;
  children: ((data: {textColor: string}) => JSX.Element) | JSX.Element | string;
}

const _styles = {
  container: {
    ...ThemeStyles.card_header,
  },
  content: {
    ...ThemeStyles.card_header_content,
  },
};

const CardHeader: React.FC<Props> = ({children, style}) => {
  const styles = useStyles(_styles);
  const cardColor = useSchemeValue('CARD.primary');

  const content = useMemo(() => {
    if (typeof children === 'function') {
      return children({textColor: cardColor.text.color});
    }
    if (typeof children === 'object') {
      return React.cloneElement(children, {color: cardColor.text.color});
    }
    if (typeof children === 'string') {
      return <Text color={cardColor.text.color}>{children}</Text>;
    }
    return <View />;
  }, [children, cardColor]);

  return (
    <Box style={[styles.container, {borderBottomColor: cardColor.separator}]}>
      <Box style={[styles.content, style]}>{content}</Box>
    </Box>
  );
};

export default CardHeader;
