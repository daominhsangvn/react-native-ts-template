import React, {useCallback, useImperativeHandle} from 'react';
import Animated, {
  runOnUI,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {TouchableOpacity, View} from 'react-native';
import useStyles from '@lib/themes/useStyles';
import Icon from '@components/Icon';
import useLayout from '@lib/hooks/useLayout';

interface RefProps {
  open: () => void;
  close: () => void;
  toggle: () => void;
}

interface Props {
  header: JSX.Element;
  children: JSX.Element;
}

const _styles = {
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  bodyContainer: {width: '100%', overflow: 'hidden'},
  bodyContent: {width: '100%', position: 'absolute'},
  headerIcon: {
    position: 'absolute',
    right: 0,
  },
};

const Accordion = React.forwardRef<RefProps, Props>(
  ({header, children}, ref) => {
    const styles = useStyles(_styles);
    const isOpen = useSharedValue(false);
    const height = useSharedValue(0);
    const [layout, onLayout] = useLayout();
    const progress = useDerivedValue(() =>
      isOpen.value
        ? withTiming(1, {duration: 100})
        : withTiming(0, {duration: 100}),
    );
    const toggleHandler = useCallback(() => {
      if (height.value === 0) {
        runOnUI(() => {
          'worklet';
          height.value = layout.height;
        })();
      }
      isOpen.value = !isOpen.value;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen, layout.height]);

    const addIconStyle = useAnimatedStyle(() => ({
      opacity: isOpen.value ? 0 : 1,
    }));

    const removeIconStyle = useAnimatedStyle(() => ({
      opacity: !isOpen.value ? 0 : 1,
    }));

    const bodyContainerDynamicStyle = useAnimatedStyle(() => {
      return {
        height: height.value * progress.value + 0.1,
        opacity: progress.value === 0 ? 0 : 1,
      };
    });

    const open = useCallback(() => {}, []);
    const close = useCallback(() => {}, []);
    const toggle = useCallback(() => {}, []);

    useImperativeHandle(ref, () => ({
      open,
      close,
      toggle,
    }));

    return (
      <>
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.header} onPress={toggleHandler}>
            {header}
            <Animated.View style={[styles.headerIcon, addIconStyle]}>
              <Icon name="ios-add" size={24} />
            </Animated.View>
            <Animated.View style={[styles.headerIcon, removeIconStyle]}>
              <Icon name="ios-remove" size={24} />
            </Animated.View>
          </TouchableOpacity>
        </View>
        <Animated.View
          style={[styles.bodyContainer, bodyContainerDynamicStyle]}>
          <View onLayout={onLayout} style={styles.bodyContent}>
            {children}
          </View>
        </Animated.View>
      </>
    );
  },
);

export default Accordion;
