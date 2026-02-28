import { Request, Response } from 'express';
import Boom from '@hapi/boom';
import { PostService } from './post.service';

export class PostController {
  private postService: PostService;
  constructor(postService: PostService) {
    this.postService = postService;
  }

  getPosts = (req: Request, res: Response) => {
    const posts = this.postService.getPosts();
    return res.json(posts);
  };

  getPostById = (req: Request, res: Response) => {
    const { id } = req.params;
    const post = this.postService.getPostById(String(id));
    return res.json(post);
  };

  createPost = (req: Request, res: Response) => {
    if (!req.body) {
      throw Boom.badRequest('Request body is required');
    }

    const { title, description, imageUrl } = req.body;

    if (title === undefined) {
      throw Boom.badRequest('Title is required');
    }

    if (description === undefined) {
      throw Boom.badRequest('Description is required');
    }

    if (imageUrl === undefined) {
      throw Boom.badRequest('Image URL is required');
    }

    const post = this.postService.createPost({
      title,
      description,
      imageUrl,
    });

    return res.json(post);
  };

  deletePost = (req: Request, res: Response) => {
    const { id } = req.params;
    this.postService.deletePost(String(id));
    return res.send('Post deleted');
  };
}
