import { configureStore } from '@reduxjs/toolkit';
import globalReducer from './reducers/global';
import { setupListeners } from '@reduxjs/toolkit/query';
import { api } from '../api/user';

const store = configureStore({
  reducer: {
    global: globalReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
