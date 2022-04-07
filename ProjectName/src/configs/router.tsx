import React, {useCallback} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WelcomeScreen from '@screens/Welcome';
import CarouselScreen from '@screens/Carousel';
import HomeScreen from '@screens/Home';
import SampleScreen from '@screens/Sample';
import SignInScreen from '@screens/SignIn';
import Tab1Screen from '@screens/Tab1';
import Tab2Screen from '@screens/Tab2';
import Tab1aScreen from '@screens/Tab1a';
import {UserSelectors} from '@features/authentication/store/user/slice';
import RNBootSplash from 'react-native-bootsplash';
import {StatusBar} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from '@components/Icon';
import {remScale} from '@lib/themes/utils';
import CustomTabBar from '@components/CustomTabBar';
import {NavigationService} from '@lib/router/NavigationService';
import useTypedSelector from '@lib/hooks/useTypedSelector';

const AuthStack = createNativeStackNavigator();
const AppStack = createNativeStackNavigator();
const MainStack = createNativeStackNavigator();
const TabStack = createBottomTabNavigator();
const Tab1Stack = createNativeStackNavigator();

function Tab1Navigator() {
  return (
    <Tab1Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="TabNav1">
      <Tab1Stack.Screen name="TabNav1" component={Tab1Screen} />
      <Tab1Stack.Screen name="TabNav1a" component={Tab1aScreen} />
    </Tab1Stack.Navigator>
  );
}

function TabNavigator() {
  return (
    <TabStack.Navigator
      screenOptions={{headerShown: false}}
      tabBar={props => <CustomTabBar {...props} />}>
      <TabStack.Screen
        name="Tab1"
        component={Tab1Navigator}
        options={{
          tabBarLabel: 'Tab 1',
          tabBarIcon: ({color}) => (
            <Icon name="home" size={remScale(3)} color={color} />
          ),
        }}
      />
      <TabStack.Screen
        name="Tab2"
        component={Tab2Screen}
        options={{
          tabBarLabel: 'Tab 2',
          tabBarIcon: ({color}) => (
            <Icon name="settings" size={remScale(3)} color={color} />
          ),
        }}
      />
    </TabStack.Navigator>
  );
}

function App() {
  return (
    <AppStack.Navigator screenOptions={{headerShown: false}}>
      <AppStack.Screen name="Home" component={HomeScreen} />
      <AppStack.Screen name="Sample" component={SampleScreen} />
      <AppStack.Screen name="Carousel" component={CarouselScreen} />
    </AppStack.Navigator>
  );
}

function Auth() {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <AuthStack.Screen name="Welcome" component={WelcomeScreen} />
      <AuthStack.Screen name="SignIn" component={SignInScreen} />
    </AuthStack.Navigator>
  );
}

const Router = () => {
  // const theme = useTheme();
  const isAuth = useTypedSelector(UserSelectors.selectIsAuth);

  const initialRouteName = isAuth ? 'App' : 'Auth';

  const onNavigationReady = useCallback(() => {
    setTimeout(() => {
      RNBootSplash.hide({fade: true});
      StatusBar.setHidden(false);
    }, 1000);
  }, []);

  return (
    <NavigationContainer
      ref={NavigationService.navigationRef}
      onReady={onNavigationReady}>
      <MainStack.Navigator initialRouteName={initialRouteName}>
        <MainStack.Screen
          name="Auth"
          component={Auth}
          options={{headerShown: false}}
        />
        <MainStack.Screen
          name="App"
          component={App}
          options={{headerShown: false}}
        />
        <AppStack.Screen
          name="Tab"
          component={TabNavigator}
          options={{headerShown: false}}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
