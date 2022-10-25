import { useState } from "react";

import "./TransactionsList.css";
import TransactionListItem from "../TransactionListItem/TransactionListItem";
import { Transaction } from "../../types";
import { Button } from "antd";
import EditTransaction from "../EditTransaction/EditTransaction";
import CreateTransaction from "../CreateTransaction/CreateTransaction";

interface Props {
  transactions: Transaction[];
  setTransactions: (transactions: Transaction[]) => void;
}

const TransactionsList = ({ transactions, setTransactions }: Props) => {
  const [sortBy, setSortBy] = useState("");
  const [showAddTransaction, setShowAddTransaction] = useState(false);
  const [showEditModal, setShowEditModal] = useState("");
  const renderTransactions = () => {
    let sortedTransactions = [...transactions];

    if (sortBy === "dateAsc") {
      sortedTransactions = sortedTransactions.sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
    }
    if (sortBy === "dateDesc") {
      sortedTransactions = sortedTransactions.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
    }
    if (sortBy === "nameAsc") {
      sortedTransactions = sortedTransactions.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }
    if (sortBy === "nameDesc") {
      sortedTransactions = sortedTransactions.sort((a, b) =>
        b.name.localeCompare(a.name)
      );
    }
    return sortedTransactions.map((transaction) => (
      <TransactionListItem
        key={transaction.id}
        transaction={transaction}
        setShowEditModal={setShowEditModal}
      />
    ));
  };

  return (
    <div className="container">
      <div className="header">Transactions:</div>
      <div className="buttons-wrapper">
        <Button onClick={() => setSortBy("dateAsc")}>Date ascending</Button>
        <Button onClick={() => setSortBy("dateDesc")}>Date descending</Button>
        <Button onClick={() => setSortBy("nameAsc")}>Name ascending</Button>
        <Button onClick={() => setSortBy("nameDesc")}>Name descending</Button>
        <Button onClick={() => setSortBy("")}>Clear</Button>
      </div>

      <div>
        {/* index should not be used as key: */}
        {/* {transactions.map((transaction, i) => (<TransactionListItem key={i} transaction={transaction} />))} */}
        {renderTransactions()}
        <Button onClick={() => setShowAddTransaction(true)}>Add new</Button>
        <EditTransaction
          transactions={transactions}
          showEditModal={showEditModal}
          onCancel={() => setShowEditModal("")}
          onSave={(item) => {
            setTransactions(
              transactions.map((obj) => {
                if (obj.id === showEditModal) {
                  return item;
                }
                return obj;
              })
            );
            setShowEditModal("");
          }}
        />
        <CreateTransaction
          showAddTransaction={showAddTransaction}
          onCancel={() => setShowAddTransaction(false)}
          onSave={(item) => {
            setTransactions([...transactions, item]);
            setShowAddTransaction(false);
          }}
        />
      </div>
    </div>
  );
};

export default TransactionsList;
