import "./TransactionListItem.css";
import { Transaction } from "../../types";
import { format } from "date-fns";
import { Button } from "antd";

interface Props {
  transaction: Transaction;
  setShowEditModal: (transaction: string) => void;
}

const TransactionListItem = ({ transaction, setShowEditModal }: Props) => {
  const { name, date, id, amount } = transaction;
  const formattedDate = format(date, "MMM do, yyyy HH:mm");

  return (
    <div className="transaction-list-item">
      <div className="transaction-list-item__name">{name}</div>
      <div className="transaction-list-item__date">{formattedDate}</div>
      <div className="transaction-list-item__amount">
        {amount.toFixed(2)} kr
      </div>
      <div className="transaction-list-item__id">{id}</div>
      <div className="transaction-list-item__editBtn">
        <Button
          onClick={() => {
            setShowEditModal(id);
          }}
        >
          Edit
        </Button>
      </div>
    </div>
  );
};

export default TransactionListItem;
