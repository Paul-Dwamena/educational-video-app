// components/VideoForm.tsx
import React, { useState } from 'react';
import { createVideo,fetchVideos } from '../redux/slices/videoSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import Image from 'next/image';
import { RiVideoUploadFill } from 'react-icons/ri';

const VideoForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useAppDispatch();

  const user_id = process.env.NEXT_PUBLIC_USER_ID as string;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createVideo({ user_id, title, video_url: url, description }))
      .then(() => {
        setTitle('');
        setUrl('');
        setDescription('');
        dispatch(fetchVideos()); // Fetch the updated list of videos
        alert('Video uploaded successfully');
      })
      .catch(error => {
        console.error('Error creating video:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className='my-24'>
        <div className='flex-center-column space-y-4 w-2/3 mx-auto'>
          <Image src={'/video.png'} alt='' width={80} height={80} />
          <h2 className='text-center text-xl mb font-semibold mt-4'>Upload a New Video</h2>

          <input value={title} className='rounded-xl px-3 py-3 outline-none border w-full' placeholder='Title' onChange={(e) => setTitle(e.target.value)} />

          <input value={url} className='rounded-xl px-3 py-3 outline-none border w-full' placeholder='Type or paster URL' onChange={(e) => setUrl(e.target.value)}  />

          <textarea value={description} className='rounded-xl px-3 py-3 outline-none border w-full' rows={4}   placeholder='Enter video description' onChange={(e) => setDescription(e.target.value)}  />
      
          <button type="submit" className='text-green-400 px-4 py-2 bg-white rounded-md flex gap-3 items-center'>
            <RiVideoUploadFill className='h-5 w-5' />
            Upload Video
          </button>
      </div>
    </form>
  );
};

export default VideoForm;
