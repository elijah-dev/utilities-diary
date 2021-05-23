import { Router } from 'express';
import entryRouter from '@/routes/entry.routes';
import tariffsRouter from '@/routes/tariffs.routes';

const router = Router();

router.use('/entry', entryRouter);
router.use('/tariffs', tariffsRouter);

export default router;
