import React, { useState } from "react";
import "./CreateTransaction.css";
import { Transaction } from "../../types";
import {
  Button,
  ConfigProvider,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
} from "antd";
import locale from "antd/es/locale/en_GB";
import moment, { Moment } from "moment";
import { PlusCircleOutlined } from "@ant-design/icons";
import uuid from "react-uuid";

interface Props {
  showAddTransaction: boolean;
  onSave: (item: Transaction) => void;
  onCancel: () => void;
}

const CreateTransaction = ({ showAddTransaction, onSave, onCancel }: Props) => {
  const [pickedDate, setPickedDate] = useState<Moment | null>(moment());
  const [form] = Form.useForm();

  return (
    <Modal
      open={showAddTransaction}
      okText="Create"
      cancelText="Cancel"
      className="modalStyle"
      onCancel={onCancel}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        name="transaction-create"
        initialValues={{ name: "", amount: 0 }}
      >
        <div className="transaction-create__container">
          <div className="transaction-create__header">
            <h2>Create new transaction </h2>
          </div>
          <div className="transaction-create__name">
            <Form.Item
              label="Transaction name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input the transaction name",
                  min: 3,
                },
              ]}
            >
              <Input placeholder="Enter transaction name" />
            </Form.Item>
          </div>
          <div className="transaction-create__date">
            <ConfigProvider locale={locale}>
              <DatePicker
                defaultValue={moment()}
                format="YYYY-MM-DD HH:mm"
                placeholder="Select date / time"
                onChange={(d) => setPickedDate(d)}
                status={!pickedDate ? "error" : ""}
                showTime={{
                  minuteStep: 1,
                  format: "HH:mm",
                  hideDisabledOptions: true,
                  showNow: true,
                }}
              />
            </ConfigProvider>
          </div>
          <div className="transaction-create__amount">
            <Form.Item
              label={<span>Amount</span>}
              name="amount"
              rules={[
                {
                  required: true,
                  type: "number",
                  message: "Please input transaction amount",
                  min: 1,
                },
              ]}
            >
              <InputNumber prefix="kr" />
            </Form.Item>
          </div>
          <Button
            type="primary"
            shape="round"
            size="large"
            disabled={!pickedDate}
            onClick={() => {
              form
                .validateFields()
                .then((values) => {
                  const newTransaction: Transaction = {
                    ...values,
                    id: uuid(), // Should have check for existing identical id in array
                    date: moment(pickedDate).valueOf(),
                  };
                  onSave(newTransaction);
                  form.resetFields();
                })
                .catch((error) => {
                  console.log("Validate Failed:", error); // Would be for error handling and logging
                });
            }}
            icon={<PlusCircleOutlined />}
          >
            Create
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default CreateTransaction;
