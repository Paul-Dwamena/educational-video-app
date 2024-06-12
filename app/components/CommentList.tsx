
import React from 'react';
import { Comment } from '../types/comment';
import { MdOutlineKeyboardDoubleArrowRight } from 'react-icons/md';
import CommentForm from './CommentForm';

interface CommentListProps {
  comments: Comment[];
  video_id: string;
}

const CommentList: React.FC<CommentListProps> = ({ comments, video_id }) => {
  return (
    <div className='rounded-md bg-[#F7F8FF] w-[380px] relative'>
      <div className="flex-center-row w-full border-b border-b-gray-300 py-3 relative">
        <MdOutlineKeyboardDoubleArrowRight className='h-5 w-5 absolute left-4' />
        <h3><span>{comments.length}</span>   Comments</h3>
      </div>
     
      <ul className='py-5 overflow-y-scroll'>
        {comments.map((comment) => (
          <div className='px-5 flex gap-3 py-2' key={comment.id}>
           
            <div className="w-full">
              <h3 className='text-sm font-bold'>{comment.user_id}</h3>
              <p className='text-xs text-gray-700'>{comment.content}</p>
            </div>
          </div>
        ))}
        </ul>

        <CommentForm video_id={video_id} />

      
    </div>
  );
};

export default CommentList;
