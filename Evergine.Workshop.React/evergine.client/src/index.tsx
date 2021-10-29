import React from 'react';
import ReactDOM from 'react-dom';
import { initializeEvergine } from '@evergine/evergine-initialize';
import { EvergineApp } from '@modules/app';


initializeEvergine();

ReactDOM.render(
    <React.StrictMode>
        <EvergineApp />
    </React.StrictMode>,
    document.getElementById('main')
);
