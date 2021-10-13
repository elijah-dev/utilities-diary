import mongoose from 'mongoose';
import colors from 'colors';
import dotenv from 'dotenv';
import { initializeApp } from './app';

dotenv.config();

const { PORT, MONGO_URL, MONGO_URL_DEV, NODE_ENV } = process.env;

const mongoUrl = NODE_ENV === 'development' ? MONGO_URL_DEV : MONGO_URL;

if (mongoUrl === undefined || PORT === undefined) {
    throw new Error('Error loading environment variables');
}

mongoose
    .connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log(colors.magenta(`Connected to ${NODE_ENV} database`));
        initializeApp(PORT);
    })
    .catch(() => {
        throw new Error('Could not connect to database');
    });
