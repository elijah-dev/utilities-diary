import { createTarrifs, getTarrifs } from '@/controller/tariffs.controller';
import { Router } from 'express';

const router = Router();

router.route('/').get(getTarrifs).post(createTarrifs);

export default router;
