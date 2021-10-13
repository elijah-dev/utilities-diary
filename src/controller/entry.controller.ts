import { rejectionHandler } from '@/middleware/rejection-handler.middleware';
import { Entry, EntryData, EntryField } from '@/model/entry/entry.model';
import { Tariffs } from '@/model/tariffs/tariffs.model';
import { ErrorResponse } from '@/utils/error-response.util';

export const getEntries = rejectionHandler(async (req, res) => {
    const entries = await Entry.find();

    return res.status(200).json(entries);
});

export const createInitialEntry = rejectionHandler(async (req, res) => {
    const entries = await Entry.find();

    if (entries.length > 0) {
        throw new ErrorResponse(403, 'Entries have been already initialize');
    }

    await EntryData.validate(req.body);

    const { cold, hot, electricity } = req.body;

    const entryData = {
        cold: new EntryField({ value: cold }),
        hot: new EntryField({ value: hot }),
        electricity: new EntryField({ value: electricity }),
    };

    const newEntry = await Entry.create(entryData);

    return res.status(201).json(newEntry);
});

export const createEntry = rejectionHandler(async (req, res) => {
    await EntryData.validate(req.body);

    const { cold, hot, electricity } = req.body;

    const entryData = {
        cold: new EntryField({ value: cold }),
        hot: new EntryField({ value: hot }),
        electricity: new EntryField({ value: electricity }),
    };

    const [tariffs] = await Tariffs.find().limit(1);

    if (tariffs === undefined)
        throw new ErrorResponse(500, 'Could not find tariff information');

    const [lastEntry] = await Entry.find().sort({ createdAt: 'desc' }).limit(1);

    if (lastEntry === undefined)
        throw new ErrorResponse(500, 'Could not find last entry');

    entryData.cold.setDifference(lastEntry.cold.value);
    entryData.cold.setCost(tariffs.cold);
    entryData.hot.setDifference(lastEntry.hot.value);
    entryData.hot.setCost(tariffs.hot);
    entryData.electricity.setDifference(lastEntry.electricity.value);
    entryData.electricity.setCost(tariffs.electricity);

    const newEntry = await Entry.create(entryData);

    return res.status(201).json(newEntry);
});

export const getLastEntry = rejectionHandler(async (_, res) => {
    const lastEntry = await Entry.find().sort({ createdAt: 'desc' }).limit(1);
    return res.status(200).json(lastEntry);
});

export const deleteLastEntry = rejectionHandler(async (_, res) => {
    const [lastEntry] = await Entry.find().sort({ createdAt: 'desc' }).limit(1);

    if (lastEntry !== undefined) {
        const deletedEntry = await Entry.findByIdAndDelete(lastEntry.id);
        return res.status(200).json(deletedEntry);
    }

    return res.status(405).send('Connot delete initial entry');
});

export const getEntryById = rejectionHandler(
    async ({ params: { entryId } }, res) => {
        const entry = await Entry.findById(entryId);
        return res.status(200).json(entry);
    }
);

export const deleteEntryById = rejectionHandler(
    async ({ params: { entryId } }, res) => {
        const deletedEntry = await Entry.findByIdAndDelete(entryId);
        return res.status(200).json(deletedEntry);
    }
);
