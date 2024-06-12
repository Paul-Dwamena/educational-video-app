export interface Video {
    id: string;
    title: string;
    video_url: string;
    description:string;
    num_comments: number;
    user_id:string;
    created_at:string;
  }
  
  export interface CreateVideoPayload {
    user_id: string;
    title: string;
    video_url: string;
    description: string;
  }
  
  export interface VideoApiResponse {
    videos: Video[];
  }
  