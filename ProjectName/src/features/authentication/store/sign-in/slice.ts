import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import {THUNK_STATUS} from '@configs/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DataService} from '@lib/data/dataService';
import {TRootState} from '@configs/store/root.reducer';
import reduxStorage from "@configs/store/storage";

interface TSignInStoreState {
  data: any;
  status: string;
  error: string | null;
}

interface TSignInActionPayload {
  email: string;
  password: string;
}

interface TSignInActionResponse {
  token: string;
}

const name = 'signIn';
const whitelist: string[] = [];
const selector = (state: TRootState): TSignInStoreState => state.auth[name];

const initialState: TSignInStoreState = {
  status: THUNK_STATUS.IDLE,
  error: null,
  data: null,
};

const persistConfig = {
  key: name,
  whitelist,
  storage: reduxStorage,
};

const signInAction = createAsyncThunk(
  `${name}/signIn`,
  async ({
    email,
    password,
  }: TSignInActionPayload): Promise<TSignInActionResponse> => {
    const data = await DataService.login({email, password});
    return {token: data.accessToken};
  },
);

const slice = createSlice({
  name,
  initialState,
  reducers: {
    reset(state: TSignInStoreState) {
      (Object.keys(initialState) as (keyof TSignInStoreState)[]).forEach(k => {
        state[k] = initialState[k];
      });
    },
  },
  extraReducers: builder => {
    builder.addCase(signInAction.pending, state => {
      state.status = THUNK_STATUS.LOADING;
      state.error = null;
    });
    builder.addCase(signInAction.fulfilled, state => {
      state.status = THUNK_STATUS.SUCCEEDED;
    });
    builder.addCase(
      signInAction.rejected,
      (state, action: PayloadAction<any>) => {
        state.status = THUNK_STATUS.FAILED;
        state.error = action.payload.error.message;
      },
    );
  },
});
const selectStatus = createSelector(selector, state => state.status);
const selectIsLoading = createSelector(
  selector,
  state => state.status === THUNK_STATUS.LOADING,
);
const selectIsSucceeded = createSelector(
  selector,
  state => state.status === THUNK_STATUS.SUCCEEDED,
);
const selectIsError = createSelector(
  selector,
  state => state.status === THUNK_STATUS.FAILED,
);
const selectError = createSelector(selector, state => state.error);

export const SignInActions: {
  signInAction: typeof signInAction;
} & typeof slice.actions = {
  ...slice.actions,
  signInAction,
};

export const SignInSelectors: {
  selectIsLoading: typeof selectIsLoading;
  selectIsSucceeded: typeof selectIsSucceeded;
  selectIsError: typeof selectIsError;
  selectError: typeof selectError;
  selectStatus: typeof selectStatus;
} = {
  selectIsLoading,
  selectIsSucceeded,
  selectIsError,
  selectError,
  selectStatus,
};

export default persistReducer(persistConfig, slice.reducer);
