import React, {useCallback, useMemo} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolation,
  SharedValue,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Text from '@components/Text';
import {COLORS, HEADER_HEIGHT} from '@configs/themes/var';
import useSchemeValue from '@lib/themes/useSchemeValue';
import useStyles from '@lib/themes/useStyles';
import Icon from '@components/Icon';
import useSchemeValueSwitch from '@lib/themes/useCustomSchemeColor';
import ThemeStyles from '@configs/themes/styles';
import Box from '@components/layouts/Box';

interface Props {
  title?: string;
  y?: SharedValue<number>;
  transparent?: boolean;
  headerRight?: () => void;
  absolute?: boolean;
}

const _styles = {
  container: {
    ...ThemeStyles.navbar,
  },
  backButton: {
    height: HEADER_HEIGHT,
    justifyContent: 'center',
    ...ThemeStyles.backButton,
  },
  navLeftContainer: {
    alignItems: 'flex-start',
    ...ThemeStyles.navLeftContainer,
  },
  navRightContainer: {
    alignItems: 'flex-start',
    ...ThemeStyles.navRightContainer,
  },
};

const NavBar: React.FC<Props> = ({
  title,
  y,
  transparent = false,
  headerRight,
  absolute = true,
}) => {
  const styles = useStyles(_styles);
  const navigation = useNavigation();
  const {type} = navigation.getState();
  const insets = useSafeAreaInsets();
  const navbarColorValue = useSchemeValue<string>('NAVBAR.background');
  const navbarTitleColor = useSchemeValue<string>('NAVBAR.title');
  const backIconColor = useSchemeValueSwitch(COLORS.grayscale500, '#ffffff');
  const navigationState = navigation.getState();

  // console.log('navigation', navigation);
  // console.log('navigation.canGoBack()', navigation.canGoBack());
  // console.log('navigation.getState()', navigation.getState());
  //   // console.log('navigation.canGoBack()', navigation.canGoBack());
  //   // console.log(

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const navBarStyle = useAnimatedStyle(() => {
    if (!y) {
      return {};
    }

    const translateY = interpolate(
      y.value,
      [0, HEADER_HEIGHT + insets.top],
      [0, -HEADER_HEIGHT - insets.top],
      {
        extrapolateRight: Extrapolation.CLAMP,
      },
    );

    return {
      transform: [{translateY}],
    };
  });

  const headerRightContent = useMemo(() => {
    if (headerRight) {
      return headerRight();
    } else {
      return null;
    }
  }, [headerRight]);

  return (
    <Animated.View
      style={[
        navBarStyle,
        absolute && StyleSheet.absoluteFill,
        styles.container,
        {
          height: HEADER_HEIGHT + insets.top,
          backgroundColor: transparent ? 'transparent' : navbarColorValue,
          paddingTop: insets.top,
        },
      ]}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
          flex: 1,
        }}>
        <Box style={styles.navLeftContainer}>
          {navigation.canGoBack() &&
            type === 'stack' &&
            navigationState.routes.length > 1 && (
              <TouchableOpacity onPress={goBack} style={styles.backButton}>
                <Icon
                  name="chevron-back-outline"
                  size={24}
                  color={backIconColor}
                />
              </TouchableOpacity>
            )}
        </Box>
        <Box flex center>
          <Text color={navbarTitleColor} style={[ThemeStyles.navbarTitle]}>
            {title}
          </Text>
        </Box>
        <Box style={styles.navRightContainer}>{headerRightContent}</Box>
      </View>
    </Animated.View>
  );
};

export default NavBar;
