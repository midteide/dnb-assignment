import React, { useState } from "react";

import "./EditTransaction.css";
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
import { SaveOutlined } from "@ant-design/icons";

interface Props {
  transactions: Transaction[];
  showEditModal: string;
  onSave: (item: Transaction) => void;
  onCancel: () => void;
}

const EditTransaction = ({
  transactions,
  showEditModal,
  onSave,
  onCancel,
}: Props) => {
  const [pickedDate, setPickedDate] = useState<Moment | null>(moment());
  const [form] = Form.useForm();

  const transaction: Transaction | undefined = transactions.find(
    (item) => item.id === showEditModal
  );
  if (!transaction) return <></>;
  const { name, date, amount } = transaction;
  form.setFieldsValue({
    name,
    date,
    amount,
  });
  return (
    <Modal
      open={!!showEditModal}
      okText="Save"
      bodyStyle={{ padding: 24, borderRadius: "20px" }}
      cancelText="Cancel"
      className="modalStyle"
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      footer={null}
      onOk={() => console.log("Validate Failed:")}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal_create_agent"
        initialValues={{ name, date, amount }}
      >
        <div className="transaction-edit__container">
          <div className="transaction-edit__header">
            <h2>Edit transaction</h2>
          </div>
          <div className="transaction-edit__name">
            <Form.Item label="Transaction name" name="name">
              <Input />
            </Form.Item>
          </div>
          <div className="transaction-edit__date">
            <ConfigProvider locale={locale}>
              <DatePicker
                defaultValue={moment()}
                format="YYYY-MM-DD HH:mm"
                placeholder="Select date / time"
                onChange={(d) => setPickedDate(d)}
                status={!date ? "error" : ""}
                showTime={{
                  minuteStep: 1,
                  format: "HH:mm",
                  hideDisabledOptions: true,
                  showNow: true,
                }}
              />
            </ConfigProvider>
          </div>
          <div className="transaction-edit__amount">
            <Form.Item label={<span>Amount</span>} name="amount">
              <InputNumber prefix="kr" />
            </Form.Item>
          </div>
          <Button
            type="primary"
            shape="round"
            size="large"
            onClick={() => {
              form
                .validateFields()
                .then((values) => {
                  const n: Transaction = {
                    ...values,
                    id: transaction.id,
                    date: moment(pickedDate).valueOf(),
                  };
                  form.resetFields();

                  onSave(n);
                })
                .catch((info) => {
                  console.log("Validate Failed:", info);
                });
            }}
            icon={<SaveOutlined />}
          >
            Save
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default EditTransaction;
