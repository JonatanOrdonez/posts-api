import { Request, Response } from 'express';
import Boom from '@hapi/boom';
import {
  createPostService,
  deletePostService,
  getPostByIdService,
  getPostsService,
  updatePostService,
} from './post.service';
import { getUserFromRequest } from '../../middlewares/authMiddleware';

export const getPostsController = async (req: Request, res: Response) => {
  const posts = await getPostsService();
  return res.json(posts);
};

export const getPostByIdController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const post = await getPostByIdService(String(id));
  return res.json(post);
};

export const createPostController = async (req: Request, res: Response) => {
  const user = getUserFromRequest(req);

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

  const post = await createPostService({
    title,
    description,
    imageUrl,
    userId: user.id,
  });
  return res.status(201).json(post);
};

export const updatePostController = async (req: Request, res: Response) => {
  if (!req.body) {
    throw Boom.badRequest('Request body is required');
  }

  const { id } = req.params;
  const { title, description, imageUrl } = req.body;

  const post = await updatePostService({
    id: String(id),
    title,
    description,
    imageUrl,
  });
  return res.json(post);
};

export const deletePostController = async (req: Request, res: Response) => {
  const { id } = req.params;
  await deletePostService(String(id));
  return res.send('Post deleted');
};
