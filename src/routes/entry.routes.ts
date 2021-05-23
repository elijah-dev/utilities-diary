import {
    createEntry,
    deleteLastEntry,
    getEntries,
    deleteEntryById,
    getEntryById,
    getLastEntry,
} from '@/controller/entry.controller';
import { Router } from 'express';

const router = Router();

router.route('/create').post(createEntry);

router.route('/last').get(getLastEntry).delete(deleteLastEntry);

router.route('/all').get(getEntries);

router.route('/:entryId').get(getEntryById).delete(deleteEntryById);

export default router;
