import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {installStaticApi} from './static-api';
import './styles.css';

installStaticApi();
ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>);
