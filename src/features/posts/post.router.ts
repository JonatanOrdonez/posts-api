import { Router } from 'express';
import {
  createPostController,
  deletePostController,
  getPostByIdController,
  getPostsController,
  updatePostController,
} from './post.controller';
import { authMiddleware } from '../../middlewares/authMiddleware';

export const router = Router();

router.use(authMiddleware);
router.get('/', getPostsController);
router.post('/', createPostController);
router.get('/:id', getPostByIdController);
router.patch('/:id', updatePostController);
router.delete('/:id', deletePostController);
