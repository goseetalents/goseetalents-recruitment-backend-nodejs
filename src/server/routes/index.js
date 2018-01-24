import express from 'express';
import authRoutes from './auth';
import applicantRoutes from './applicant';
import userRoutes from './users';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/applicants', applicantRoutes);
router.use('/users', userRoutes);

export default router;
