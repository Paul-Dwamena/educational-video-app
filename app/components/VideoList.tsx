'use client';

import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchVideos } from '../redux/slices/videoSlice';
import { Video } from '../types';
import Link from 'next/link';
import Image from 'next/image';
import { timeAgo } from '../utils/timeago';

export default function VideoList() {
    const dispatch = useAppDispatch();
    const { videos, status } = useAppSelector((state) => state.videos);
    const searchTerm = useAppSelector((state) => state.search.searchTerm);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchVideos());
        }
    }, [status, dispatch]);

    const filteredVideos = searchTerm
        ? videos.filter((video: Video) =>
            video.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : videos;

    return (
        <div>
            <h2>All Videos</h2>
            <div className="mx-auto grid grid-cols-4 mt-[80px] gap-8">
                {status === 'loading' && <p>Loading...</p>}
                {status === 'succeeded' && filteredVideos.length > 0 &&
                    filteredVideos.map((video: Video) => (
                        <div key={video.id} className='w-[300px]'>
                            <Link href={`/videos/${video.id}`}>
                                <Image src="/thumbnail.png" alt="thumbnail" width={300} height={300} />
                                <div className="flex flex-col mt-2">
                                    <h2 className='font-semibold'>{video.title}</h2>
                                    <div className="flex items-center space-x-3 justify-between">
                                        <p className='text-xs text-gray-500'>{timeAgo(video.created_at)}</p>
                                        <p className='text-xs text-gray-500 mr-3'>{video.num_comments} Comments</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                {status === 'succeeded' && filteredVideos.length === 0 && <p>No videos found.</p>}
                {status === 'failed' && <p>Error loading videos.</p>}
            </div>
        </div>
    );
}
