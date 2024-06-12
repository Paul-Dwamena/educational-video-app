'use client'
import VideoDetail from '@/app/components/VideoDetail';
import RecommendededVideos from '@/app/components/RecommendedVideos';
import React, { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks'
import { fetchVideos } from '@/app/redux/slices/videoSlice'
import { fetchComments,selectCommentsByVideoId } from '@/app/redux/slices/commentsSlice'

const Video = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { videos, status, error } = useAppSelector((state) => state.videos);
  const comments = useAppSelector((state) => selectCommentsByVideoId(state, id));

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchVideos());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (id) {
      dispatch(fetchComments(id));
    }
  }, [id, dispatch]);

  const video = videos.find((video) => video.id === id);

  return (
    <div className='px-20 mt-24'>
      {video ? (
        <VideoDetail video={video} comments={comments} />
      ) : (
        <p>Loading...</p>
      )}

      <h2 className='my-5 text-2xl'>You may also like</h2>

      <RecommendededVideos selectedId={id}/>
    </div>
  );
}

export default Video
