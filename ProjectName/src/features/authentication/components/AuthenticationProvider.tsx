import React, {useCallback, useEffect} from 'react';
import {
  UserSelectors,
  UserActions,
} from '@features/authentication/store/user/slice';
import useTypedDispatch from '@lib/hooks/useAppDispatch';
import useTypedSelector from '@lib/hooks/useTypedSelector';

interface Props {
  children: React.ReactNode;
}

export const AuthenticationProvider: React.FC<Props> = ({children}) => {
  const dispatch = useTypedDispatch();
  const token = useTypedSelector(UserSelectors.selectToken);

  const getUserInfo = useCallback(() => {
    dispatch(UserActions.fetchProfile());
  }, [dispatch]);

  const checkAuth = useCallback(() => {
    if (token) {
      getUserInfo();
    }
  }, [getUserInfo, token]);

  // const resetToSignIn = useCallback(() => {
  //   NavigationService.reset({
  //     index: 1,
  //     routes: [{name: 'Auth'}],
  //     state: {routes: [{name: 'SignIn'}]},
  //   });
  // }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // useEffect(() => {
  //   if (isLoginExpired && isAuth) {
  //     Logger.log('[AuthenticationProvider] Login expired > Sign out!');
  //     dispatch(signOutAction())
  //       .then(unwrapResult)
  //       .finally(() => {
  //         resetToSignIn();
  //       });
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isLoginExpired, isAuth]);

  return <>{children}</>;
};
