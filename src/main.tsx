import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {CssBaseline} from '@mui/material';
import {BrowserRouter} from 'react-router-dom';
import {SnackbarProvider, enqueueSnackbar} from 'notistack';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <SnackbarProvider/>
        <CssBaseline/>
        <App />
    </BrowserRouter>
  </React.StrictMode>,
)
