import { Tariffs } from '@/model/tariffs/tariffs.model';
import { rejectionHandler } from '@/middleware/rejection-handler.middleware';
import { ErrorResponse } from '@/utils/error-response.util';

export const getTarrifs = rejectionHandler(async (req, res) => {
    const tariffs = await Tariffs.find().limit(1);

    return res.status(200).json(tariffs);
});

export const createTarrifs = rejectionHandler(async (req, res) => {
    await Tariffs.validate(req.body);

    const tariffsEntries = await Tariffs.count();

    if (tariffsEntries > 0) {
        throw new ErrorResponse(405, 'Entry already exists');
    }

    const entry = await Tariffs.create(req.body);
    return res.status(201).json(entry);
});
