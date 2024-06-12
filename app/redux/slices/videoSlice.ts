import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Video, CreateVideoPayload } from '../../types';

const user_id = process.env.NEXT_PUBLIC_USER_ID as string;
console.log(user_id)


interface VideosState {
    videos: Video[];
    video: Video | null; 
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    filteredVideos: Video[];
  }
  
  const initialState: VideosState = {
    videos: [],
    video: null,
    status: 'idle',
    error: null,
    filteredVideos: [],
  };


export const fetchVideos = createAsyncThunk<Video[]>('videos/fetchVideos', async () => {
    const response = await fetch(`https://take-home-assessment-423502.uc.r.appspot.com/api/videos?user_id=${user_id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch videos');
    }
    const data = await response.json();
    return data.videos; 
  });

  export const fetchVideoById = createAsyncThunk<Video, string>('videos/fetchVideoById', async (id) => {
    const response = await fetch(`https://take-home-assessment-423502.uc.r.appspot.com/api/videos/single?video_id=/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch video');
    }
    return response.json();
  });
  
export const createVideo = createAsyncThunk<Video, CreateVideoPayload>('videos/createVideo', async (payload) => {
  const response = await fetch('https://take-home-assessment-423502.uc.r.appspot.com/api/videos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error('Failed to create video');
  }
  return response.json() as Promise<Video>;
});

const videosSlice = createSlice({
    name: 'videos',
    initialState,
    reducers: {
        resetFilteredVideos(state) {
            state.filteredVideos = state.videos; 
          },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchVideos.pending, (state) => {
          state.status = 'loading';
          state.error = null;
        })
        .addCase(fetchVideos.fulfilled, (state, action: PayloadAction<Video[]>) => {
          state.status = 'succeeded';
          state.videos = action.payload;
        })
        .addCase(fetchVideos.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message || 'Failed to fetch videos';
        })
        .addCase(fetchVideoById.pending, (state) => {
          state.status = 'loading';
          state.error = null;
        })
        .addCase(fetchVideoById.fulfilled, (state, action: PayloadAction<Video>) => {
          state.status = 'succeeded';
          state.video = action.payload;
        })
        .addCase(fetchVideoById.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message || 'Failed to fetch video';
        })
        .addCase(createVideo.fulfilled, (state, action: PayloadAction<Video>) => {
          state.videos.push(action.payload);
        })
        .addCase(createVideo.rejected, (state, action) => {
          state.error = action.error.message || 'Failed to create video';
        });
    },
  });

export const { resetFilteredVideos } = videosSlice.actions;
export default videosSlice.reducer;
