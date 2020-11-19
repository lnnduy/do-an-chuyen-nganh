import { Alert, Form, Input, Modal } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import api from '../../api';
import handleErrors from '../../shared/handleErrors';

type Props = {
  visible: boolean;
  onCancel: Function;
  onUpdated: Function;
  khoCauHoi: any;
  idHocPhan: number;
};

type FieldData = {
  name: string[];
  value: any;
  touched: boolean;
  validating: boolean;
  errors: string[];
};

function UpdateKhoCauHoiModal({
  visible,
  onCancel,
  onUpdated,
  khoCauHoi,
}: Props) {
  const formRef = useRef<any>();
  const [failed, setFailed] = useState(false);
  const [errors, setErrors] = useState([]);
  const [fields, setFields] = useState<FieldData[] | undefined>(undefined);

  const capNhatKhoCauHoi = async (form?: any) => {
    if (form === undefined) {
      formRef.current?.submit();
      return;
    }
    try {
      const res = await api.khoCauHoi.capNhatKhoCauHoi(khoCauHoi.id, form);

      if (!res.success) {
        if (res.statusCode === 400) {
          setErrors(res.errors);
          setFailed(true);
        } else {
          handleErrors(res);
          setFailed(true);
        }
      } else onUpdated(res.data);
    } catch (error) {
      console.log(error);
      setFailed(true);
    } finally {
      onCancel();
    }
  };

  useEffect(() => {
    console.log(khoCauHoi);
    setFields([
      {
        name: ['tenKhoCauHoi'],
        value: khoCauHoi.tenKhoCauHoi,
        touched: false,
        errors: [],
        validating: false,
      },
      {
        name: ['moTa'],
        value: khoCauHoi.moTa,
        touched: false,
        errors: [],
        validating: false,
      },
    ]);
  }, [khoCauHoi]);

  return (
    <Modal
      style={{ paddingTop: 40 }}
      title={`Cập nhật kho câu hỏi ${khoCauHoi.tenKhoCauHoi}`}
      visible={visible}
      okText="Cập nhật"
      cancelText="Huỷ"
      centered
      maskClosable={false}
      onCancel={() => onCancel()}
      onOk={() => capNhatKhoCauHoi()}
    >
      {failed && errors.length > 0 && <Alert message={errors.join('\n')} />}
      <Form
        layout="vertical"
        onFinish={capNhatKhoCauHoi}
        ref={formRef}
        fields={fields}
      >
        <Form.Item label="Tên kho câu hỏi" name="tenKhoCauHoi">
          <Input placeholder="Nhập tên kho câu hỏi" allowClear size="large" />
        </Form.Item>
        <Form.Item label="Mô tả" name="moTa">
          <Input placeholder="Nhập mô tả" allowClear size="large" />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default UpdateKhoCauHoiModal;
