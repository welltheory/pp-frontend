import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Processing from './Processing';
import Checkout from './Checkout';
import Portal from './Portal';

// Question #1 - What is the purpose of this file?
// Question #2 - Is there anything missing from this file?

export default () => {
  return (
    <Routes>
      <Route path="/processing" element={<Processing />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/portal" element={<Portal />} />
    </Routes>
  );
};
