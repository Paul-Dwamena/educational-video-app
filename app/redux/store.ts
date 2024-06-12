// redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import videosReducer from './slices/videoSlice';
import commentsReducer from './slices/commentsSlice';
import searchReducer from './slices/searchSlice';

const store = configureStore({
  reducer: {
    videos: videosReducer,
    comments: commentsReducer,
    search:searchReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
