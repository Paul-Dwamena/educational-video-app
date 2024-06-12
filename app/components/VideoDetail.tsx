// components/VideoDetail.tsx
import React from 'react';
import { Video } from '../types/video';
import { Comment } from '../types/comment';
import CommentList from './CommentList';
import VideoPlayer from './VideoPlayer';
import Image from 'next/image';
import { IoIosHeartEmpty } from 'react-icons/io';
import { GoBell } from 'react-icons/go';
import { LuEye } from 'react-icons/lu';

interface VideoDetailProps {
  video: Video;
  comments: Comment[];
}

const VideoDetail: React.FC<VideoDetailProps> = ({ video, comments }) => {
  return (
    <div className='flex justify-between w-full'>
      <div className="w-full">
        <VideoPlayer url={video.video_url} />
        <div className="mt-4 flex items-center justify-between w-[950px]">
          <div className='flex items-center'>
          <Image src={'/sample-image.png'} height={60} width={60} alt='' />
          <div className="ml-3">
            <div className="flex gap-1 items-center">
              <p className='text-sm'>{video.user_id}</p>
              <Image src={'/verified.svg'} height={20} width={20} alt='' />

              <div className="flex items-center gap-1 ml-6 px-3 py-1 rounded-lg bg-red-500 text-white cursor-pointer">
                <IoIosHeartEmpty className="h-4 w-4" />
                <p className='text-[10px]'>Follow</p>
              </div>

              <GoBell className='h-5 w-5 ml-2' />
            </div>
            
            <h2 className='font-semibold text-xl'>{video.title}</h2>
          </div>
          </div>

          
        </div>

        <div className='px-4 py-2 bg-[#F7F8FF] rounded-md mt-4 w-[950px] space-y-1'>
        <p className='text-sm'><span className='font-bold'>10.2k</span>  Followers</p>

        <p className='text-sm'>{video.description}</p>
          
        </div>
      </div>
      <CommentList comments={comments} video_id={video.id} />
    </div>
  );
};

export default VideoDetail;
