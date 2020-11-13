import { Card, Tooltip, Popconfirm, Typography, Form, Input } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import {
  EditOutlined,
  DeleteOutlined,
  CloseCircleOutlined,
  CheckCircleOutlined,
  CheckOutlined,
  CloseOutlined,
} from '@ant-design/icons';

type Props = {
  dapAn: any;
  index: number;
  updateNoiDungDapAn: Function;
  updateDapAnDung: Function;
  deleteDapAn: Function;
  markRight: boolean;
};

function CardDapAn({
  index,
  dapAn,
  updateNoiDungDapAn,
  updateDapAnDung,
  deleteDapAn,
  markRight,
}: Props) {
  const formRef = useRef<any>();
  const [editing, setEditing] = useState(false);
  const [fields, setFields] = useState<any>();

  useEffect(() => {
    setFields([
      {
        name: ['noiDung'],
        value: dapAn.noiDung,
        touched: false,
        errors: [],
        validating: false,
      },
    ]);
  }, [editing]);

  return (
    <Card
      className="card-cau-hoi"
      style={{
        borderColor: !dapAn?.noiDung?.trim()
          ? '#303030'
          : markRight
          ? '#4ef9b0'
          : '#ff5045',
      }}
      title={`Đáp án ${index + 1}`}
      actions={
        (editing && [
          <Tooltip title="Lưu">
            <CheckOutlined onClick={() => formRef?.current?.submit()} />
          </Tooltip>,
          <Tooltip title="Huỷ">
            <CloseOutlined onClick={() => setEditing(false)} />
          </Tooltip>,
        ]) ||
        (!!dapAn?.noiDung?.trim() && [
          (!dapAn.dapAnDung && (
            <Tooltip title="Đánh dấu đáp án đúng">
              <CheckCircleOutlined
                onClick={() => updateDapAnDung(index, true)}
              />
            </Tooltip>
          )) || (
            <Tooltip title="Đánh dấu đáp án sai">
              <CloseCircleOutlined
                onClick={() => updateDapAnDung(index, false)}
              />
            </Tooltip>
          ),
          <Tooltip title="Sửa nội dung đáp án">
            <EditOutlined onClick={() => setEditing(true)} />
          </Tooltip>,
          <Popconfirm
            title="Xoá đáp án?"
            cancelText="Huỷ"
            okText="Xoá"
            icon={<CloseCircleOutlined style={{ color: 'red' }} />}
            onConfirm={() => deleteDapAn(index)}
          >
            <Tooltip title="Xoá đáp án">
              <DeleteOutlined />
            </Tooltip>
          </Popconfirm>,
        ]) || [
          <Tooltip title="Sửa nội dung đáp án">
            <EditOutlined onClick={() => setEditing(true)} />
          </Tooltip>,
          <Popconfirm
            title="Xoá đáp án?"
            cancelText="Huỷ"
            okText="Xoá"
            icon={<CloseCircleOutlined style={{ color: 'red' }} />}
            onConfirm={() => deleteDapAn(index)}
          >
            <Tooltip title="Xoá đáp án">
              <DeleteOutlined />
            </Tooltip>
          </Popconfirm>,
        ]
      }
    >
      {(editing && (
        <Form
          fields={fields}
          layout="vertical"
          ref={formRef}
          onFinish={(form) => {
            updateNoiDungDapAn(index, form.noiDung);
            setEditing(false);
          }}
        >
          <Form.Item
            name="noiDung"
            label="Nội dung đáp án"
            rules={[{ required: true, message: 'Chưa nhập nội dung đáp án' }]}
          >
            <Input.TextArea
              rows={3}
              placeholder="Nhập nội dung đáp án"
              size="large"
              onChange={(e) => console.log(e)}
            />
          </Form.Item>
        </Form>
      )) ||
        (!!dapAn?.noiDung?.trim() && (
          <Typography style={{ fontSize: 16 }}>
            <pre>{dapAn.noiDung}</pre>
          </Typography>
        )) || (
          <Typography.Text>
            <i>Không có nội dung. Đáp án này sẽ được bỏ qua</i>
          </Typography.Text>
        )}
    </Card>
  );
}

export default CardDapAn;
