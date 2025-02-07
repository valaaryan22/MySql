import express from 'express';
import { registerUser, loginUser, getAllUsers, logoutUser } from '../controllers/userController.js';
import { authenticateUser } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/getuser',authenticateUser,getAllUsers)
router.get('/logout',logoutUser)
export default router;
