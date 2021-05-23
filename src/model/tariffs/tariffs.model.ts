import { model, Schema } from 'mongoose';
import { TariffsDocument, TariffsModel } from '@/model/tariffs/tariffs.types';

const TariffsSchema = new Schema<TariffsDocument, TariffsModel>(
    {
        cold: { type: Number, required: true },
        hot: { type: Number, required: true },
        electricity: { type: Number, required: true },
    },
    { timestamps: true }
);

export const Tariffs = model('Tariffs', TariffsSchema);
