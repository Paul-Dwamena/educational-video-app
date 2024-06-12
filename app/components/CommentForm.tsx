
import React, { useState } from 'react';
import { createComment, fetchComments} from '../redux/slices/commentsSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { IoSendSharp } from 'react-icons/io5';

interface CommentFormProps {
  video_id: string;
}

const CommentForm: React.FC<CommentFormProps> = ({ video_id }) => {
  const dispatch = useAppDispatch();
  const [content, setContent] = useState('');
  const userIds = ['john_doe', 'jane_doe', 'jane_smith', 'john_smith', 'jane_jones'];

  // this is use to randomly select a fake user_id to comment
  const getRandomUser = () => {
    return userIds[Math.floor(Math.random() * userIds.length)];
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim() !== '') {
      dispatch(createComment({ video_id, content, user_id: getRandomUser() }))
        .then(() => {
          setContent('');
          dispatch(fetchComments(video_id)); // Fetch comments after creating a comment
        });
    }
  };

  return (
    <form onSubmit={handleSubmit} className='absolute bottom-3 w-72'>
      <div className="flex gap-3 items-center px-5">
        <input className='border border-[#1319B9] outline-none w-full rounded-lg px-3 py-2 text-sm' placeholder='Add a comment...' value={content} onChange={(e) => setContent(e.target.value)}/>

        <button type="submit">
          <IoSendSharp className='h-6 w-6 text-[#1319B9]' />
        </button>
      
      </div>

    </form>
  );
};

export default CommentForm;
