import {createSelector, createSlice} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TRootState} from '@configs/store/root.reducer';
import {ColorSchemeName} from 'react-native';
import reduxStorage from "@configs/store/storage";

interface IThemeState {
  auto: boolean;
  scheme: ColorSchemeName;
}

const name = 'themes';
const whitelist: string[] = ['auto', 'scheme'];
const selectSelf = (state: TRootState): IThemeState => state[name];

const initialState: IThemeState = {
  auto: true,
  scheme: 'light',
};

const persistConfig = {
  key: name,
  whitelist,
  storage: reduxStorage,
};

const slice = createSlice({
  name,
  initialState,
  reducers: {
    setScheme(state, action) {
      state.scheme = action.payload.scheme;
    },
    setAutoScheme(state, action) {
      state.auto = action.payload.auto;
    },
    toggleScheme(state) {
      if (!state.auto) {
        state.scheme = state.scheme === 'dark' ? 'light' : 'dark';
      }
    },
  },
});

const selectIsThemeAuto = createSelector(selectSelf, state => state.auto);
const selectThemeScheme = createSelector(selectSelf, state => state.scheme);

export const ThemeActions: typeof slice.actions = {
  ...slice.actions,
};

export const ThemeSelectors: {
  selectIsThemeAuto: typeof selectIsThemeAuto;
  selectThemeScheme: typeof selectThemeScheme;
} = {
  selectIsThemeAuto,
  selectThemeScheme,
};

export default persistReducer(persistConfig, slice.reducer);
