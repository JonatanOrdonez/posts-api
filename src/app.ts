import express, { Router } from 'express';
import { NODE_ENV, PORT } from './config';
import cors from 'cors';
import { errorsMiddleware } from './middlewares/errorsMiddleware';
import { PostService } from './features/posts/post.service';
import { PostController } from './features/posts/post.controller';
import { PostRouter } from './features/posts/post.router';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello, World!!!!!');
});

const apiRouter = Router();
app.use('/api', apiRouter);

// Services
const postService = new PostService();

// Controllers
const postController = new PostController(postService);

// Router
const postRouter = new PostRouter(postController);

// Routes
apiRouter.use('/posts', postRouter.router);

app.use(errorsMiddleware);

if (NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log('Server is running on http://localhost:' + PORT);
  });
}

export default app;
