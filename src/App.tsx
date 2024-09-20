import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CurrencyExchangePage from "./pages/CurrencyExchangePage";
import HistoryPage from "./pages/HistoryPage";

const App: React.FC = () => {
  return (
    //I'm using React Router library to navigate through pages
    <Router>
      <Routes>
        <Route path="/" element={<CurrencyExchangePage />} />
        <Route path="/history" element={<HistoryPage />} />
      </Routes>
    </Router>
  );
};

export default App;
