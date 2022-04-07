import React from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import {mergeStyles} from '@lib/utils/helpers';
import CardHeader from '@components/Card/Header';
import CardFooter from '@components/Card/Footer';
import CardBody from '@components/Card/Body';
import useStyles from '@lib/themes/useStyles';
import ThemeStyles from '@configs/themes/styles';
import useSchemeValue from '@lib/themes/useSchemeValue';

interface Props {
  style?: StyleProp<ViewStyle>;
  children: JSX.Element;
}

interface ICard {
  Header: typeof CardHeader;
  Footer: typeof CardFooter;
  Body: typeof CardBody;
}

const _styles = {
  container: {
    ...ThemeStyles.card,
  },
};

const Card: React.FC<Props> & ICard = ({children, style, ...rest}) => {
  const styles = useStyles(_styles);
  const cardColor = useSchemeValue('CARD.primary');
  return (
    <View
      style={mergeStyles(
        styles.container,
        {
          backgroundColor: cardColor.background,
          shadowColor: cardColor.shadowColor,
        },
        style,
      )}
      {...rest}>
      {children}
    </View>
  );
};

Card.Header = CardHeader;
Card.Footer = CardFooter;
Card.Body = CardBody;

export default Card;
