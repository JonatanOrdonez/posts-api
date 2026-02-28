import { CreatePostDTO, Post } from './post.types';
import Boom from '@hapi/boom';

export class PostService {
  private posts: Post[];

  constructor() {
    this.posts = [];
  }

  getPosts = (): Post[] => {
    return this.posts;
  };

  getPostById = (postId: string): Post => {
    const postFound = this.posts.find((post) => post.id === postId);

    if (!postFound) {
      throw Boom.notFound('Post not found');
    }

    return postFound;
  };

  createPost = (post: CreatePostDTO): Post => {
    const newPost: Post = {
      id: new Date().getTime().toString(),
      title: post.title,
      description: post.description,
      imageUrl: post.imageUrl,
      userId: post.userId,
    };
    this.posts.push(newPost);
    return newPost;
  };

  deletePost = (postId: string): void => {
    const postFound = this.posts.find((post) => post.id === postId);

    if (!postFound) {
      throw Boom.notFound('Post not found');
    }

    this.posts = this.posts.filter((post) => post.id !== postId);
  };
}
