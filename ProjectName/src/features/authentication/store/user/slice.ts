import {THUNK_STATUS} from '@configs/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  AnyAction,
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import {SignOutActions} from '../sign-out/slice';
import {SignUpActions} from '../sign-up/slice';
import {SignInActions} from '../sign-in/slice';
import {DataService} from '@lib/data/dataService';
import {TRootState} from '@configs/store/root.reducer';
import reduxStorage from "@configs/store/storage";

interface TUserState {
  token: string | null;
  user: any;
  error: string | null;
  status: string;
}

interface TFetchProfileResponse {
  user: any;
}

const name = 'user';
const whitelist: string[] = ['token'];
const selectSelf = (state: TRootState): TUserState => state.auth[name];

const initialState: TUserState = {
  token: null,
  user: null,
  error: null,
  status: THUNK_STATUS.IDLE,
};

const persistConfig = {
  key: name,
  whitelist,
  storage: reduxStorage,
};

const fetchProfile = createAsyncThunk<TFetchProfileResponse, void>(
  `${name}/fetchProfile`,
  async () => {
    const user = await DataService.getCurrentUser();
    return {user};
  },
);

const slice = createSlice({
  name,
  initialState,
  reducers: {
    reset(state: TUserState) {
      (Object.keys(initialState) as (keyof TUserState)[]).forEach(k => {
        state[k] = initialState[k];
      });
    },
  },
  extraReducers: builder => {
    builder.addCase(
      SignUpActions.signUpThunkAction.fulfilled,
      (state: TUserState, action: PayloadAction<any>) => {
        state.token = action.payload.token;
      },
    );
    builder.addCase(
      SignInActions.signInAction.fulfilled,
      (state: TUserState, action: PayloadAction<any>) => {
        state.token = action.payload.token;
      },
    );
    builder.addCase(
      SignOutActions.signOutAction.fulfilled,
      (state: TUserState) => {
        (Object.keys(initialState) as (keyof TUserState)[]).forEach(k => {
          state[k] = initialState[k];
        });
      },
    );
    builder.addCase(fetchProfile.pending, (state: TUserState) => {
      state.status = THUNK_STATUS.LOADING;
      state.error = null;
    });
    builder.addCase(
      fetchProfile.fulfilled,
      (state: TUserState, action: PayloadAction<any>) => {
        state.status = THUNK_STATUS.SUCCEEDED;
        state.user = action.payload.user;
      },
    );
    builder.addCase(
      fetchProfile.rejected,
      (state: TUserState, action: PayloadAction<any>) => {
        state.status = THUNK_STATUS.FAILED;
        state.error = action.payload.error.message;
      },
    );
  },
});

const selectToken = createSelector(selectSelf, state => state.token);
const selectUser = createSelector(selectSelf, state => state.user);
const selectIsLoading = createSelector(
  selectSelf,
  state => state.status === THUNK_STATUS.LOADING,
);
const selectIsAuth = createSelector(selectSelf, state => !!state.token);

export const UserActions: {
  fetchProfile: typeof fetchProfile;
} & typeof slice.actions = {
  ...slice.actions,
  fetchProfile,
};

export const UserSelectors: {
  selectToken: typeof selectToken;
  selectUser: typeof selectUser;
  selectIsLoading: typeof selectIsLoading;
  selectIsAuth: typeof selectIsAuth;
} = {
  selectToken,
  selectUser,
  selectIsLoading,
  selectIsAuth,
};

export default persistReducer(persistConfig, slice.reducer);
