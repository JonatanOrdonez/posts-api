export interface Post {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

export interface CreatePostDTO {
  title: string;
  description: string;
  imageUrl: string;
}
