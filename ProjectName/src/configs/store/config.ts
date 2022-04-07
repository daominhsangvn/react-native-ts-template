// ** Redux, Thunk & Root Reducer Imports
import {configureStore} from '@reduxjs/toolkit';
import {persistStore, persistReducer, Storage} from 'redux-persist';
import {rootReducer} from './root.reducer';
import reduxStorage from '@configs/store/storage';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist/es/constants';

const persistConfig: {
  key: string;
  storage: Storage;
  whitelist: string[];
} = {
  key: 'root',
  storage: reduxStorage,
  whitelist: [],
};

// ** init middleware
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export {store, persistor};

export type TStore = typeof store;
export type TStoreState = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;
