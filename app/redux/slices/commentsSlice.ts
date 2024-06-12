import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Comment, CreateCommentPayload} from '../../types';

export const fetchComments = createAsyncThunk<Comment[], string>('comments/fetchComments', async (videoId) => {
    const response = await fetch(`https://take-home-assessment-423502.uc.r.appspot.com/api/videos/comments?video_id=${videoId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch videos');
    }
    const data = await response.json();
    return data.comments; 
});

export const createComment = createAsyncThunk<Comment, CreateCommentPayload>('comments/createComment', async (payload) => {
    const response = await fetch(`https://take-home-assessment-423502.uc.r.appspot.com/api/videos/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });
    return response.json();
});

const commentsSlice = createSlice({
    name: 'comments',
    initialState: {
        commentsByVideo: {} as Record<string, Comment[]>,
        status: 'idle',
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchComments.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchComments.fulfilled, (state, action) => {
                const videoId = action.meta.arg;
                state.commentsByVideo[videoId] = action.payload;
                state.status = 'succeeded';
            })
            .addCase(fetchComments.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || null;
            })
            .addCase(createComment.fulfilled, (state, action) => {
                const videoId = action.payload.video_id;
                state.commentsByVideo[videoId] = [...(state.commentsByVideo[videoId] || []), action.payload];
            });
    },
});

export const selectCommentsByVideoId = (state: any, videoId: string) => state.comments.commentsByVideo[videoId] || [];
export default commentsSlice.reducer;
