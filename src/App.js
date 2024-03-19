// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MyForm from './MyForm';
import ResultsPage from './ResultsPage';
import DisplayPage from './DisplayPage';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<MyForm />} />
          <Route path="results" element={<ResultsPage />} />
          <Route path="display" element={<DisplayPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
