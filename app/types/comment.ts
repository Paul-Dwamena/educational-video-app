export interface Comment {
    id: string;
    video_id: string;
    content: string;
    createdAt: string;
    user_id:string;
  }
  
  export interface CreateCommentPayload {
    video_id: string;
    content: string;
    user_id:string;
  }
  
  export interface CommentApiResponse {
    comments: Comment[];
  }
  