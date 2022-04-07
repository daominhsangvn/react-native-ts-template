import {combineReducers} from 'redux';
import signIn from './sign-in/slice';
import signOut from './sign-out/slice';
import signUp from './sign-up/slice';
import user from './user/slice';

const reducer = combineReducers({
  signIn,
  signUp,
  signOut,
  user,
});

export type TAuthStoreState = ReturnType<typeof reducer>;

export default reducer;
