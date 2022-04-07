import React, {useCallback, useImperativeHandle, useState} from 'react';
import useStyles from '@lib/themes/useStyles';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import {Modal, StyleProp, StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import {View} from 'moti';
import useLayout from '@lib/hooks/useLayout';
import {remScale} from '@lib/themes/utils';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export interface IBottomSheetRef {
  toggle: () => void;
  open: () => void;
  close: () => void;
}

interface Props {
  children: JSX.Element;
  customStyle?: {
    container?: StyleProp<ViewStyle>;
    wrapper?: StyleProp<ViewStyle>;
  };
}

const _styles = {
  container: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    opacity: 1,
  },
  wrapper: {
    backgroundColor: '#ffffff',
    width: '100%',
    borderTopRightRadius: remScale(2),
    borderTopLeftRadius: remScale(2),
    transform: [{translateY: 99999}],
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
};

// More features: https://www.youtube.com/watch?v=KvRqsRwpwhY

const ANIMATION_TIME = 300;

const BottomSheet = React.forwardRef<IBottomSheetRef | undefined, Props>(
  ({children, customStyle = {}}, ref) => {
    const styles = useStyles(_styles);
    const isOpen = useSharedValue(false);
    const translateY = useSharedValue(0);
    const height = useSharedValue(0);
    const [modalVisible, setModalVisible] = useState(false);

    const insets = useSafeAreaInsets();

    const [, onLayout] = useLayout(0, size => {
      height.value = size.height + 5;
      translateY.value = size.height + 5;
    });

    const toggle = useCallback(() => {
      if (modalVisible) {
        setModalVisible(true);
        setTimeout(() => {
          isOpen.value = true;
        }, 200);
      } else {
        isOpen.value = false;
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modalVisible]);

    const open = useCallback(() => {
      setModalVisible(true);
      setTimeout(() => {
        isOpen.value = true;
      }, 200);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const close = useCallback(() => {
      isOpen.value = false;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const overlayPress = useCallback(() => {
      isOpen.value = false;
      setTimeout(() => {
        setModalVisible(false);
      }, ANIMATION_TIME);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const sheetAnimatedStyle = useAnimatedStyle(() => {
      return {
        transform: [
          {
            translateY: !isOpen.value
              ? withTiming(height.value + 5, {duration: ANIMATION_TIME})
              : withDelay(0, withTiming(0, {duration: ANIMATION_TIME})),
          },
        ],
      };
    });

    const containerAnimatedStyle = useAnimatedStyle(() => {
      return {
        opacity: isOpen.value
          ? withTiming(1, {duration: ANIMATION_TIME})
          : withDelay(100, withTiming(0, {duration: ANIMATION_TIME})),
      };
    });

    useImperativeHandle(
      ref,
      () => ({
        toggle,
        open,
        close,
      }),
      [toggle, open, close],
    );

    return (
      <Modal transparent visible={modalVisible}>
        <Animated.View
          style={[
            StyleSheet.absoluteFillObject,
            styles.container,
            customStyle.container,
            containerAnimatedStyle,
          ]}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={overlayPress}
            style={[styles.overlay]}>
            <Animated.View
              style={[
                styles.wrapper,
                customStyle.wrapper,
                sheetAnimatedStyle,
                {paddingBottom: insets.bottom},
              ]}>
              <View onLayout={onLayout}>{children}</View>
            </Animated.View>
          </TouchableOpacity>
        </Animated.View>
      </Modal>
    );
  },
);

export default BottomSheet;
