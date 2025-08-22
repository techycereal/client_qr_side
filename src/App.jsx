import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import Success from './Success';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </div>
  );
}

export default App;
