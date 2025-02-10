import express from 'express';
import { registerUser, loginUser, getAllUsers, logoutUser, deleteUserByEmail,  updateUserDetails, changeUserPassword } from '../controllers/userController.js';
import { authenticateUser } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/getuser',authenticateUser,getAllUsers)
router.get('/logout',logoutUser)
router.post('/deleteuser',deleteUserByEmail)
router.put('/updatedata',authenticateUser,updateUserDetails)
router.post('/changepassword',authenticateUser,changeUserPassword)

export default router;
