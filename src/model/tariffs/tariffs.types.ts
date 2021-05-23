import { Model, Document } from 'mongoose';

export interface TariffsDocument extends Document {
    cold: number;
    hot: number;
    electricity: number;
}

export type TariffsModel = Model<TariffsDocument>;
