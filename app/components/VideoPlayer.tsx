// components/VideoPlayer.tsx
import React from 'react';

interface VideoPlayerProps {
  url: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url }) => {
  return (
    <div className="video-player h-[550px] w-[950px]">
      <video controls autoPlay muted={false} className='h-full w-full rounded-md'>
        <source src={url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
