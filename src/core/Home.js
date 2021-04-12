import React from 'react';
import "../styles.css";
import { API } from '../backend'
import Base from './Base';

export default function Home() {
    console.log("API IS", API);
    return (
        <Base>
            <h1 className="text-white">Home</h1>
        </Base>
    )
}