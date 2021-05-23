import { ErrorResponse } from '@/utils/error-response.util';
import { normalizeValue } from '@/utils/normalize-value.util';
import { CallbackError, model, Schema } from 'mongoose';
import {
    EntryDataDocument,
    EntryDataModel,
    EntryDocument,
    EntryFieldDocument,
    EntryFieldModel,
    EntryModel,
} from './entry.types';

const EntryFieldSchema = new Schema<EntryFieldDocument, EntryFieldModel>({
    value: { type: Number, required: true },
    difference: { type: Number, default: -1 },
    cost: { type: Number, default: -1 },
});

EntryFieldSchema.methods.setDifference = function setDisfference(
    this: EntryFieldDocument,
    value: number
) {
    this.difference = normalizeValue(this.value - value);
};

EntryFieldSchema.methods.setCost = function setCost(
    this: EntryFieldDocument,
    value: number
) {
    if (this.difference >= 0) {
        this.cost = normalizeValue(this.difference * value);
    }
};

const EntrySchema = new Schema<EntryDocument, EntryModel>(
    {
        cold: { type: EntryFieldSchema, default: {} },
        hot: { type: EntryFieldSchema, default: {} },
        electricity: { type: EntryFieldSchema, default: {} },
        totalCost: { type: Number, default: -1 },
    },
    { timestamps: true }
);

EntrySchema.pre('save', function CalculateTotal(next) {
    let error: CallbackError | undefined;
    try {
        this.totalCost = normalizeValue(
            this.cold.cost + this.hot.cost + this.electricity.cost
        );
    } catch {
        error = new ErrorResponse(
            500,
            'Could not calculate total cost of the entry'
        );
    }
    next(error);
});

const EntryDataSchema = new Schema<EntryDataDocument, EntryDataModel>({
    cold: {
        type: Number,
        required: true,
    },
    hot: { type: Number, required: true },
    electricity: { type: Number, required: true },
});

export const EntryField = model<EntryFieldDocument, EntryFieldModel>(
    'EntryField',
    EntryFieldSchema
);
export const EntryData = model<EntryDataDocument, EntryDataModel>(
    'EntryData',
    EntryDataSchema
);
export const Entry = model<EntryDocument, EntryModel>('Entry', EntrySchema);
