import express from 'express';
import morgan from 'morgan';
import colors from 'colors';
import apiRouter from '@/routes/api.routes';
import cors from 'cors';
import path from 'path';
import { errorHandler } from '@/middleware/error-handler.middleware';

export function initializeApp(port: string): void {
    const app = express();

    app.use(cors());

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
    app.use(express.static(path.join(__dirname, '../dist')));

    app.use('/api', apiRouter);

    app.use(errorHandler);

    app.listen(port, () => {
        console.log(
            `${colors.green('Listenning on port')} ${colors.green.bold(
                port.toString()
            )}`
        );
    });
}
