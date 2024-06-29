import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BankSearch from "./BankSearch";


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<BankSearch />} />
          <Route
            path="/:bankCode/:branchCode/:branchName.html"
            element={<BankSearch />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
