import express from 'express';
import {
  getPosts,
  createPost,
  getPost,
  interactToPost,
  getPostComments,
  commentOnPost,
  deleteCommentOnPost,
  editCommentOnPost,
  editPost,
  deletePost,
} from '../controllers/posts.controller.js';
import { verifyJWT } from '../middleware/verifyJWT.js';
const router = express.Router();

router.use(verifyJWT);
router.get('/', getPosts);
router.post('/', createPost);
router.get('/:id', getPost, getPostComments);
router.put('/:id', interactToPost, editPost);
router.delete('/:id', deletePost);
router.post('/:id/comments', commentOnPost);
router.delete('/:id/comments/:commentId', deleteCommentOnPost);
router.put('/:id/comments/:commentId', editCommentOnPost);

export default router;
