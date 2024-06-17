import React from 'react'
import ReactDOM from 'react-dom/client'
import './style.css'
import {BrowserRouter} from "react-router-dom";
import {PokemonInfoApp} from "./PokemonInfoApp.jsx";
import 'animate.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <PokemonInfoApp/>
        </BrowserRouter>
    </React.StrictMode>,
)
