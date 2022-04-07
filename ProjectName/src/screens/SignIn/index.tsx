import Button from '@components/Button';
import LinkButton from '@components/LinkButton';
import Box from '@components/layouts/Box';
import Screen from '@components/layouts/Screen';
import Spacer from '@components/layouts/Spacer';
import {SignInSelectors} from '@features/authentication/store/sign-in/slice';
import {UserSelectors} from '@features/authentication/store/user/slice';
import useAlertDiaLog from '@lib/alertDialog/useAlertDialog';
import {remScale} from '@lib/themes/utils';
import React, {useCallback, useEffect} from 'react';
import {Resolver, SubmitHandler, useForm} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import {CommonActions} from '@react-navigation/native';
import Logo from '@assets/svg/logo.svg';
import {ThemeActions, ThemeSelectors} from '@lib/themes/store';
import Icon from '@components/Icon';
import Gap from '@components/Gap';
import Text from '@components/Text';
import FormField from '@components/Form/components/Field';
import FormTextInput from '@components/Form/components/TextInput';
import useStyles from '@lib/themes/useStyles';
import ScrollView from '@components/ScrollView';
import NavBar from '@components/NavBar';
import Switch from '@components/Switch';
import useTheme from '@lib/themes/useTheme';
import {AuthStackPropsType} from '@configs/router.types';
import {TouchableOpacity} from "react-native";

const _styles = {
  container: {
    flex: 1,
  },
  scrollView: {
    padding: remScale(3),
  },
  error: {
    // color: COLORS.error,
  },
};

interface FormValues {
  email: string;
  password: string;
}

const resolver: Resolver<FormValues> = async values => {
  return {
    values: values,
    errors: !values.email
      ? {
          email: {
            type: 'required',
            message: 'This is required.',
          },
        }
      : {},
  };
};

const SignInScreen: React.FC<AuthStackPropsType<'SignIn'>> = ({navigation}) => {
  const isLoading = useSelector(SignInSelectors.selectIsLoading);
  const error = useSelector(SignInSelectors.selectError);
  const isAuth = useSelector(UserSelectors.selectIsAuth);
  const isAutoScheme = useSelector(ThemeSelectors.selectIsThemeAuto);
  const {scheme} = useTheme();
  const dispatch = useDispatch();
  const styles = useStyles(_styles);
  const {showError} = useAlertDiaLog();

  const {control, handleSubmit} = useForm<FormValues>({
    resolver,
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const resetRouteToHome = useCallback(() => {
    return navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          {
            name: 'App',
            state: {
              routes: [{name: 'Home'}],
            },
          },
        ],
      }),
    );
  }, [navigation]);

  const onSubmit: SubmitHandler<FormValues> = data => {
    console.log(data);
    resetRouteToHome();
  };

  const forgotPassword = useCallback(() => {}, []);

  const signup = useCallback(() => {}, []);

  useEffect(() => {
    if (isAuth) {
      resetRouteToHome();
    }
  }, [isAuth, resetRouteToHome]);

  useEffect(() => {
    if (error) {
      showError(error).then();
    }
  }, [showError, error]);

  return (
    <Screen safe navbar style={styles.container}>
      <NavBar transparent />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Box center style={{marginVertical: remScale(2)}}>
          <Logo width={100} height={100} />
        </Box>

        {/*<FormField*/}
        {/*  name="email"*/}
        {/*  control={control}*/}
        {/*  leading={<Icon name="mail-outline" />}*/}
        {/*  disabled={isLoading}>*/}
        {/*  <FormTextInput placeholder="Your email" />*/}
        {/*</FormField>*/}

        {/*<Box>*/}
        {/*  <FormField*/}
        {/*    name="password"*/}
        {/*    control={control}*/}
        {/*    leading={<Icon name="lock-closed-outline" />}*/}
        {/*    disabled={isLoading}>*/}
        {/*    <FormTextInput*/}
        {/*      secure*/}
        {/*      placeholder="Your password"*/}
        {/*      control={control}*/}
        {/*    />*/}
        {/*  </FormField>*/}

        {/*  <Box right>*/}
        {/*    <Gap h={1} />*/}
        {/*    <LinkButton onPress={forgotPassword}>*/}
        {/*      Forgot your password?*/}
        {/*    </LinkButton>*/}
        {/*  </Box>*/}
        {/*</Box>*/}

        {/*<Button*/}
        {/*  loading={isLoading}*/}
        {/*  disabled={isLoading}*/}
        {/*  onPress={handleSubmit(onSubmit)}>*/}
        {/*  LOGIN*/}
        {/*</Button>*/}

        <TouchableOpacity>
          <Text>LOGIN</Text>
        </TouchableOpacity>

        <Gap h={2} />

        {/*<Box row>*/}
        {/*  <Box style={{flexShrink: 1, flex: 1}}>*/}
        {/*    <Text>Use Device Scheme</Text>*/}
        {/*  </Box>*/}
        {/*  <Box>*/}
        {/*    <Switch*/}
        {/*      onChange={checked => {*/}
        {/*        dispatch(ThemeActions.setAutoScheme({auto: checked}));*/}
        {/*      }}*/}
        {/*      checked={isAutoScheme}*/}
        {/*    />*/}
        {/*  </Box>*/}
        {/*</Box>*/}

        {/*{!isAutoScheme && (*/}
        {/*  <Box row style={{marginTop: remScale(2)}}>*/}
        {/*    <Box style={{flexShrink: 1, flex: 1}}>*/}
        {/*      <Text>{scheme === 'dark' ? 'Dark' : 'Light'}</Text>*/}
        {/*    </Box>*/}
        {/*    <Box>*/}
        {/*      <Switch*/}
        {/*        onChange={() => {*/}
        {/*          dispatch(ThemeActions.toggleScheme());*/}
        {/*        }}*/}
        {/*        checked={scheme === 'dark'}*/}
        {/*      />*/}
        {/*    </Box>*/}
        {/*  </Box>*/}
        {/*)}*/}

        <Gap h={2} />

        <Box row center>
          <Text>Have not account yet? </Text>
          <LinkButton onPress={signup}>Signup</LinkButton>
        </Box>
      </ScrollView>
    </Screen>
  );
};

export default SignInScreen;
