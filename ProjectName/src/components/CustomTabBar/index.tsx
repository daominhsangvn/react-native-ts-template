import React, {useEffect} from 'react';
import {View, TouchableOpacity, Text, Platform} from 'react-native';
import {mergeStyles} from '@lib/utils/helpers';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BOTTOM_TAB_HEIGHT, COLORS} from '@configs/themes/var';
import useStyles from '@lib/themes/useStyles';
import useLayout from '@lib/hooks/useLayout';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {remScale} from '@lib/themes/utils';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';

interface Props {}

const _styles = {
  root: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  container: {
    flexDirection: 'row',
    ...Platform.select({
      ios: {
        alignItems: 'flex-start',
        paddingTop: remScale(1),
      },
    }),
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6.84,

    elevation: 11,
  },
  buttonContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  label: {fontSize: 12, marginTop: 3, color: COLORS.grayscale700},
  labelFocused: {color: COLORS.primary},
};

const getRouteParams = (route: any): any => {
  if (!route.state) {
    return route.params || {};
  }

  return getRouteParams(route.state.routes[route.state.index]);
};

const CustomTabBar: React.FC<BottomTabBarProps & Props> = props => {
  const styles = useStyles(_styles);
  const {state, descriptors, navigation} = props;
  const [layout, onLayout] = useLayout();
  const visible = useSharedValue(true);
  const currentRoute = state.routes[state.index];
  // const descriptor = descriptors[currentRoute.key];
  const {tabBarVisible} = getRouteParams(currentRoute);
  const insets = useSafeAreaInsets();

  // console.log('props', props);
  // console.log('state', state);
  // console.log('currentRoute', currentRoute);
  // console.log('descriptor', descriptor);
  // console.log('descriptor state', descriptor.navigation.getState());
  // console.log('descriptor.options', descriptor.options);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      // transform: [
      //   {translateY: visible.value ? withTiming(0) : withTiming(layout.height)},
      // ],
      height: visible.value ? withTiming(layout.height) : withTiming(0),
    };
  });

  useEffect(() => {
    if (tabBarVisible === false) {
      visible.value = false;
    } else {
      visible.value = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabBarVisible]);

  return (
    <Animated.View style={[styles.root, animatedStyle]}>
      <GestureHandlerRootView>
        <View
          style={[
            styles.container,
            {height: BOTTOM_TAB_HEIGHT + insets.bottom},
          ]}
          onLayout={onLayout}>
          {state.routes.map((route, index) => {
            const {options} = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;

            const tabBarShowLabel =
              options.tabBarShowLabel !== undefined
                ? options.tabBarShowLabel
                : true;

            const isFocused = state.index === index;

            const onPress = () => {
              // if (options.emptyRoute) {
              //   return;
              // }

              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                // The `merge: true` option makes sure that the params inside the tab screen are preserved
                navigation.navigate({
                  name: route.name,
                  merge: true,
                  params: undefined,
                });
              }
            };

            const onLongPress = () => {
              navigation.emit({
                type: 'tabLongPress',
                target: route.key,
              });
            };

            return (
              <TouchableOpacity
                key={`tab-${index}`}
                activeOpacity={1}
                accessibilityRole="button"
                accessibilityState={isFocused ? {selected: true} : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={mergeStyles(
                  styles.buttonContainer,
                  Platform.select({
                    android: {
                      borderBottomWidth: 1,
                      borderBottomColor: isFocused
                        ? COLORS.primary
                        : 'transparent',
                    },
                  }),
                )}>
                {options.tabBarIcon ? (
                  <>
                    {options.tabBarIcon({
                      color: isFocused ? COLORS.primary : COLORS.grayscale700,
                      focused: isFocused,
                      size: 0,
                    })}
                    {tabBarShowLabel && (
                      <Text
                        style={[
                          styles.label,
                          isFocused ? styles.labelFocused : styles.label,
                        ]}>
                        {label}
                      </Text>
                    )}
                  </>
                ) : (
                  tabBarShowLabel && (
                    <Text
                      style={[
                        styles.label,
                        isFocused ? styles.labelFocused : styles.label,
                      ]}>
                      {label}
                    </Text>
                  )
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </GestureHandlerRootView>
    </Animated.View>
  );
};

export default CustomTabBar;
