import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

import Avti from './components/Avti'
import MojiAvti from './components/MojiAvti'
import Avto from './components/Avto'
import Admin from './components/Admin';

class App extends Component {


  render() {
    // console.log("Host URL" + process.env.PUBLIC_URL);
    return (

      <BrowserRouter>
        <Navbar />
        <div style={{margin:10}}>
        <Routes >
          <Route path="/" element={<Avti />} />
          <Route path="/mojiAvti" element={<MojiAvti />} />
          <Route path="/avtoForma" element={<Avto />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
        </div>
      </BrowserRouter>


    );
  }
}

export default App;
