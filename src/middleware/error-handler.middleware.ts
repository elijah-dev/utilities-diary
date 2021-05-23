import { ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (err, _, res) => {
    const { name, status, message } = err;

    if (name === 'ValidationError' || name === 'CastError') {
        return res.status(400).json(message);
    }

    if (status !== undefined) {
        return res.status(status).json({ message });
    }

    return res.status(500).json({ message: 'Something went wrong' });
};
