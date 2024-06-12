'use client';

import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchVideos } from '../redux/slices/videoSlice';
import { Video } from '../types';
import Link from 'next/link';
import Image from 'next/image';

interface RecommendededVideosProps {
  selectedId: string;
}

const RecommendededVideos: React.FC<RecommendededVideosProps> = ({ selectedId }) => {
  const dispatch = useAppDispatch();
  const { videos, status, error } = useAppSelector((state) => state.videos);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchVideos());
    }
  }, [status, dispatch]);

  const filteredVideos = videos.filter((video: Video) => video.id !== selectedId);

  return (
    <div>
      <div className="mx-auto grid grid-cols-4 gap-4">
        {status === 'loading' && <p>Loading...</p>}
        {status === 'succeeded' && filteredVideos.length > 0 ? (
          filteredVideos.map((video: Video) => (
            <div key={video.id} className='w-[300px]'>
              <Link href={`/videos/${video.id}`}>
                <Image src="/thumbnail.png" alt="thumbnail" width={300} height={300} />
                <div className="flex flex-col mt-2">
                  <h2 className='font-semibold'>{video.title}</h2>
                  <div className="flex items-center justify-between">
                    <p className='text-xs text-gray-500'>9 hours ago</p>
                    <p className='text-xs text-gray-500 mr-3'>{video.num_comments} Comments</p>
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <p>No recommended videos available.</p>
        )}
      </div>
    </div>
  );
};

export default RecommendededVideos;
