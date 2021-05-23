import { Router } from 'express';
import entryRouter from '@/routes/entry.routes';

const router = Router();

router.use('/entry', entryRouter);

export default router;
