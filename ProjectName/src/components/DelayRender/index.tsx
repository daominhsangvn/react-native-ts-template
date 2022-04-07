import React, {useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {StyleProp, View, ViewStyle} from 'react-native';
import useAfterInteractions from '@lib/hooks/useAfterInteractions';

interface Props {
  style?: StyleProp<ViewStyle>;
  children: JSX.Element;
  placeHolder?: JSX.Element;
}

const DelayRender: React.FC<Props> = ({
  style,
  children,
  placeHolder: Placeholder,
}) => {
  const [isReady, setIsReady] = useState(false);
  const {areInteractionsComplete} = useAfterInteractions();

  useFocusEffect(() => {
    setTimeout(() => {
      setIsReady(true);
    });
  });

  return (
    <View style={style}>
      {isReady && areInteractionsComplete
        ? children
        : Placeholder
        ? Placeholder
        : null}
    </View>
  );
};

export default DelayRender;
