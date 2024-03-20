import React from 'react';
import './App.css';
import Navigation from "./components/navigation/Navigation";
import Main from "./components/main/Main";
import Footer from "./components/footer/Footer";

const App = () => (
    <div className='app'>
        <header>
            <Navigation/>
        </header>
        <main>
            <Main/>
        </main>
        <Footer/>
    </div>
);

export default App;

