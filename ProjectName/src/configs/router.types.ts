import type {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

type AuthParamsList = {
  Welcome: undefined;
  SignIn: undefined;
};

type AppParamsList = {
  Home: undefined;
  Sample: undefined;
  Carousel: undefined;
};
type TabParamsList = {
  Tab1: undefined;
  Tab2: undefined;
};

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthParamsList>;
  App: NavigatorScreenParams<AppParamsList>;
  Tab: NavigatorScreenParams<TabParamsList>;
};

export type RootStackScreenPropsType<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type AuthStackPropsType<T extends keyof AuthParamsList> =
  CompositeScreenProps<
    NativeStackScreenProps<AuthParamsList, T>,
    RootStackScreenPropsType<keyof RootStackParamList>
  >;

export type AppStackPropsType<T extends keyof AppParamsList> =
  CompositeScreenProps<
    NativeStackScreenProps<AppParamsList, T>,
    RootStackScreenPropsType<keyof RootStackParamList>
  >;

export type TabStackPropsType<T extends keyof TabParamsList> =
  CompositeScreenProps<
    NativeStackScreenProps<TabParamsList, T>,
    RootStackScreenPropsType<keyof RootStackParamList>
  >;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
