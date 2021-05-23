import { Model, Document } from 'mongoose';

export interface EntryFieldDocument extends Document {
    value: number;
    difference: number;
    cost: number;
    setDifference: (value: number) => void;
    setCost: (value: number) => void;
}

export type EntryFieldModel = Model<EntryFieldDocument>;

export interface EntryDocument extends Document {
    cold: EntryFieldDocument;
    hot: EntryFieldDocument;
    electricity: EntryFieldDocument;
    totalCost: number;
}

export type EntryModel = Model<EntryDocument>;

export interface EntryDataDocument extends Document {
    cold: number;
    hot: number;
    electricity: number;
}

export type EntryDataModel = Model<EntryDataDocument>;
