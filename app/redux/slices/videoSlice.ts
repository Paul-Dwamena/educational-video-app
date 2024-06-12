import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Video, CreateVideoPayload } from '../../types';

const user_id = process.env.NEXT_PUBLIC_USER_ID as string;

interface VideosState {
    videos: Video[];
    video: Video | null; // Add this line
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  }
  
  const initialState: VideosState = {
    videos: [],
    video: null, // Initialize as null
    status: 'idle',
    error: null,
  };


export const fetchVideos = createAsyncThunk<Video[]>('videos/fetchVideos', async () => {
    const response = await fetch(`https://take-home-assessment-423502.uc.r.appspot.com/api/videos?user_id=${user_id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch videos');
    }
    const data = await response.json();
    // Ensure this matches the expected structure
    return data.videos; // or adapt if the API returns a different structure
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
    reducers: {},
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

export default videosSlice.reducer;
