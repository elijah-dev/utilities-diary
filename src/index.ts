import mongoose from 'mongoose';
import colors from 'colors';
import dotenv from 'dotenv';
import { initializeApp } from './app';

dotenv.config();

const { PORT, MONGO_URL } = process.env;

if (MONGO_URL === undefined || PORT === undefined) {
    throw new Error('Error loading environment variables');
}

mongoose
    .connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log(colors.magenta('Connected to MongoDB'));
        initializeApp(PORT);
    })
    .catch(() => {
        throw new Error('Could not connect to MongoDB');
    });
