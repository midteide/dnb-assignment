import React, { useState } from "react";
import "./App.css";
import TransactionsList from "./components/TransactionsList/TransactionsList";
import { createTransactionData } from "./data";
import { Transaction } from "./types";
import "antd/dist/antd.min.css";

const App = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(
    createTransactionData()
  );

  return (
    <div className="app">
      <header className="app-header">DNB WM S&I Front-End Challenge</header>

      <TransactionsList
        transactions={transactions}
        setTransactions={setTransactions}
      />
    </div>
  );
};

export default App;
