import {
  createAsyncThunk,
  createSlice,
  createSelector,
  PayloadAction,
} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {THUNK_STATUS} from '@configs/constants';
import {DataService} from '@lib/data/dataService';
import {TRootState} from '@configs/store/root.reducer';
import reduxStorage from "@configs/store/storage";

const name = 'signOut';
const whitelist: string[] = [];
const selectSelf = (state: TRootState) => state.auth[name];

interface TSignOutStoreState {
  error: string | null;
  status: string;
}

const initialState: TSignOutStoreState = {
  status: THUNK_STATUS.IDLE,
  error: null,
};

const persistConfig = {
  key: name,
  whitelist,
  storage: reduxStorage,
};

const signOutAction = createAsyncThunk(
  `${name}/signOut`,
  async (): Promise<void> => {
    await DataService.logOut();
  },
);

const slice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(signOutAction.pending, state => {
      state.status = THUNK_STATUS.LOADING;
    });
    builder.addCase(signOutAction.fulfilled, state => {
      state.status = THUNK_STATUS.SUCCEEDED;
    });
    builder.addCase(
      signOutAction.rejected,
      (state, action: PayloadAction<any>) => {
        state.status = THUNK_STATUS.IDLE;
        state.error = action.payload.error.message;
      },
    );
  },
});

export const selectIsLoading = createSelector(
  selectSelf,
  state => state.status === THUNK_STATUS.LOADING,
);
export const selectError = createSelector(selectSelf, state => state.error);

export const SignOutActions: {
  signOutAction: typeof signOutAction;
} & typeof slice.actions = {
  ...slice.actions,
  signOutAction,
};

export const SignOutSelectors: {
  selectIsLoading: typeof selectIsLoading;
  selectError: typeof selectError;
} = {
  selectIsLoading,
  selectError,
};

export default persistReducer(persistConfig, slice.reducer);
