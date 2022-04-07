import React from 'react';
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

interface Props {
  position: SharedValue<number>;
  index: number;
}

const Indicator: React.FC<Props> = ({position, index}) => {
  const opacityStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      position.value,
      [index - 1, index, index + 1], // each dot will need to have an opacity of 1 when position is equal to their index (i)
      [0.3, 1, 0.3], // when position is not i, the opacity of the dot will animate to 0.3
      // inputRange: [i - 0.50000000001, i - 0.5, i, i + 0.5, i + 0.50000000001], // only when position is ever so slightly more than +/- 0.5 of a dot's index
      // outputRange: [0.3, 1, 1, 1, 0.3], // is when the opacity changes from 1 to 0.3
      {
        extrapolateRight: Extrapolation.CLAMP,
        extrapolateLeft: Extrapolation.CLAMP,
      },
    );

    return {opacity};
  });
  return (
    <Animated.View // we will animate the opacity of the dots so use Animated.View instead of View here
      style={[
        opacityStyle,
        {
          height: 10,
          width: 10,
          backgroundColor: '#595959',
          margin: 8,
          borderRadius: 5,
        },
      ]}
    />
  );
};

export default Indicator;
