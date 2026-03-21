import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import './App.css';

function App() {
    return (
        <div
            className="App min-h-screen bg-gradient-to-b from-[#060606] to-[#003759]">
            <Header />
            <Hero />
        </div>
    );
}

export default App;

