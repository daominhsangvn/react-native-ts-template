import {
  createAsyncThunk,
  createSlice,
  createSelector,
  PayloadAction,
} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import {THUNK_STATUS} from '@configs/constants';
import {DataService} from '@lib/data/dataService';
import {TRootState} from '@configs/store/root.reducer';
import reduxStorage from '@configs/store/storage';

interface ISignUpStoreState {
  error: string | null;
  status: string;
}

interface TSignUpActionPayload {
  email: string;
  password: string;
}

interface TSignUpActionResponse {
  token: string;
}

const name = 'signUp';
const whitelist: string[] = [];
const selectSelf = (state: TRootState): ISignUpStoreState => state.auth[name];
const initialState: ISignUpStoreState = {
  status: THUNK_STATUS.IDLE,
  error: null,
};

const persistConfig = {
  key: name,
  whitelist,
  storage: reduxStorage,
};

const signUpThunkAction = createAsyncThunk(
  `${name}/signup`,
  async ({
    email,
    password,
  }: TSignUpActionPayload): Promise<TSignUpActionResponse> => {
    const data = await DataService.register({email, password});
    return {token: data.accessToken};
  },
);

const slice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(signUpThunkAction.pending, state => {
      state.status = THUNK_STATUS.LOADING;
      state.error = null;
    });

    builder.addCase(signUpThunkAction.fulfilled, state => {
      state.status = THUNK_STATUS.SUCCEEDED;
    });

    builder.addCase(
      signUpThunkAction.rejected,
      (state, action: PayloadAction<any>) => {
        state.status = THUNK_STATUS.FAILED;
        state.error = action.payload.error.message;
      },
    );
  },
});

const selectIsLoading = createSelector(
  selectSelf,
  state => state.status === THUNK_STATUS.LOADING,
);
const selectIsError = createSelector(selectSelf, state => !!state.error);
const selectError = createSelector(selectSelf, state => state.error);

export const SignUpActions: {
  signUpThunkAction: typeof signUpThunkAction;
} & typeof slice.actions = {
  ...slice.actions,
  signUpThunkAction,
};

export const SignUpSelectors: {
  selectIsLoading: typeof selectIsLoading;
  selectIsError: typeof selectIsError;
  selectError: typeof selectError;
} = {
  selectIsLoading,
  selectIsError,
  selectError,
};

export default persistReducer(persistConfig, slice.reducer);
