import { createTarrifs } from '@/controller/tariffs.controller';
import { Router } from 'express';

const router = Router();

router.route('/').post(createTarrifs);

export default router;
