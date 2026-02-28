import { Router } from 'express';
import { PostController } from './post.controller';

export class PostRouter {
  public router: Router;
  private postController: PostController;

  constructor(postController: PostController) {
    this.postController = postController;
    this.router = Router();
    this.router.get('/', this.postController.getPosts);
    this.router.post('/', this.postController.createPost);
    this.router.get('/:id', this.postController.getPostById);
    this.router.delete('/:id', this.postController.deletePost);
  }
}
