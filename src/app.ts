import express, { Router } from 'express';
import { NODE_ENV, PORT } from './config';
import cors from 'cors';
import { errorsMiddleware } from './middlewares/errorsMiddleware';
import { PostService } from './features/posts/post.service';
import { PostController } from './features/posts/post.controller';
import { PostRouter } from './features/posts/post.router';
import { AuthService } from './features/auth/auth.service';
import { AuthController } from './features/auth/auth.controller';
import { AuthRouter } from './features/auth/auth.router';

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
const authService = new AuthService();

// Controllers
const postController = new PostController(postService);
const authController = new AuthController(authService);

// Router
const postRouter = new PostRouter(postController);
const authRouter = new AuthRouter(authController);

// Routes
apiRouter.use('/posts', postRouter.router);
apiRouter.use('/auth', authRouter.router);

app.use(errorsMiddleware);

if (NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log('Server is running on http://localhost:' + PORT);
  });
}

export default app;
