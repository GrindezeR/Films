import React from 'react';
import s from './App.module.scss';
import {Films} from "./components/Films/Films";

function App() {
    return (
        <div className={s.app}>
            <Films/>
        </div>
    );
}

export default App;
