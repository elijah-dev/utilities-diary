import React, { FC, useEffect } from 'react';
import { myApp, container, inner } from '@/app.scss';
import { Button } from '@/components/button/button';
import { API_URL, ENTRY_ENDPOINT } from './app.config';

export const App: FC = () => {
    useEffect(() => {
        fetch(`${API_URL}${ENTRY_ENDPOINT}/all`)
            .then((res) => res.json())
            .then((data) => console.log(data));
    }, []);

    return (
        <>
            <h1>Hello world!</h1>
        </>
    );
};
