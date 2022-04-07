import React, {useEffect, useRef} from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  State,
  TapGestureHandler,
  TapGestureHandlerStateChangeEvent,
} from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  interpolateColor,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {clamp, snapPoint} from 'react-native-redash';
import usePreviousState from '@lib/hooks/usePreviousState';
import useSchemeValue from '@lib/themes/useSchemeValue';
import {remScale} from '@lib/themes/utils';
import ThemeStyles from '@configs/themes/styles';
import useTheme from '@lib/themes/useTheme';
import useRefState from '@lib/hooks/useRefState';
import {ISwitchColor} from '@configs/themes/types';

interface Props {
  color?: string;
  value?: string;
  checked?: boolean;
  onChange?: (isToggled: boolean, value?: string) => void;
  name?: string;
  width?: number;
  height?: number;
  circle?: number;
  border?: number;
}

interface IGestureEvent {
  x: number;
}

const config = {
  overshootClamping: true,
};
const Switch = React.forwardRef<TextInput, Props>(
  (
    {
      color = 'primary',
      value,
      checked = false,
      onChange,
      name,
      width = remScale(6.5),
      height = remScale(3.8),
      circle = remScale(3.6),
      border = remScale(0.2),
    },
    ref,
  ) => {
    const [isToggled, setIsToggled, isToggledPrevious] =
      usePreviousState<boolean>(checked);
    const [, setInitial, initialRef] = useRefState<boolean>(true);
    const translateX = useSharedValue(0);
    const trackCircleWidth = useSharedValue(width - circle - border * 2);
    const switchColor = useSchemeValue<ISwitchColor>(`SWITCH.${color}`);
    const {scheme} = useTheme();

    useEffect(() => {
      if (!initialRef.current) {
        if (isToggled !== isToggledPrevious) {
          if (onChange) {
            onChange(isToggled, value);
          }
        }
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isToggled, value]);

    const onPress = ({
      nativeEvent: {state},
    }: TapGestureHandlerStateChangeEvent) => {
      if (state !== State.ACTIVE) {
        return;
      }
      if (initialRef.current) {
        setInitial(false);
      }
      setIsToggled(prevstate => !prevstate);
      translateX.value = withSpring(
        isToggled ? 0 : trackCircleWidth.value,
        config,
      );
    };

    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{translateX: translateX.value}],
        width: interpolate(
          translateX.value,
          [0, trackCircleWidth.value / 3, trackCircleWidth.value],
          [circle, (circle / 2) * 2.5, circle],
        ),
        backgroundColor: interpolateColor(
          translateX.value,
          [0, trackCircleWidth.value],
          [
            switchColor.circle.inactive.background,
            switchColor.circle.active.background,
          ],
        ),
        borderWidth: interpolate(
          translateX.value,
          [0, trackCircleWidth.value],
          [0, scheme === 'light' ? 2 : 0],
        ),
      };
    });

    const animatedContainerStyle = useAnimatedStyle(() => {
      return {
        backgroundColor: interpolateColor(
          translateX.value,
          [0, trackCircleWidth.value],
          [switchColor.inactive.background, switchColor.active.background],
        ),
      };
    });

    const onGestureEvent = useAnimatedGestureHandler<
      PanGestureHandlerGestureEvent,
      Record<keyof IGestureEvent, IGestureEvent[keyof IGestureEvent]>
    >({
      onStart: (_e, ctx) => {
        ctx.x = translateX.value;
      },
      onActive: ({translationX}, ctx) => {
        translateX.value = clamp(
          translationX + ctx.x,
          0,
          trackCircleWidth.value,
        );
      },
      onEnd: ({velocityX}) => {
        const selectedSnapPoint = snapPoint(translateX.value, velocityX, [
          0,
          trackCircleWidth.value,
        ]);
        translateX.value = withSpring(selectedSnapPoint, config);
        runOnJS(setIsToggled)(selectedSnapPoint !== 0);
      },
    });

    const panRef = useRef(null);

    useEffect(() => {
      translateX.value = withSpring(
        !checked ? 0 : trackCircleWidth.value,
        config,
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <TapGestureHandler waitFor={panRef} onHandlerStateChange={onPress}>
        <Animated.View
          style={[
            animatedContainerStyle,
            styles.switchContainer,
            {width, height},
          ]}>
          <TextInput
            ref={ref}
            style={{
              opacity: 0,
              width: 1,
              height: 1,
              position: 'absolute',
            }}
          />
          <PanGestureHandler ref={panRef} onGestureEvent={onGestureEvent}>
            <Animated.View
              style={[
                animatedStyle,
                styles.circle,
                {
                  width: circle,
                  height: circle,
                  ...ThemeStyles.switchCircle,
                },
              ]}
            />
          </PanGestureHandler>
        </Animated.View>
      </TapGestureHandler>
    );
  },
);

export default Switch;

const styles = StyleSheet.create({
  switchContainer: {
    borderRadius: 999,
    flexDirection: 'row',
    paddingLeft: 1,
  },
  circle: {
    alignSelf: 'center',
    borderRadius: 999,
    elevation: 3,
  },
});
