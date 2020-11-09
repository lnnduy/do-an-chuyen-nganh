import { Alert, Form, Input, Modal } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import api from '../../api';
import handleErrors from '../../shared/handleErrors';

type Props = {
  visible: boolean;
  onCancel: Function;
  onUpdated: Function;
  hocPhan: any;
};

type FieldData = {
  name: string[];
  value: any;
  touched: boolean;
  validating: boolean;
  errors: string[];
};

function UpdateHocPhanModal({ visible, onCancel, onUpdated, hocPhan }: Props) {
  const formRef = useRef<any>();
  const [failed, setFailed] = useState(false);
  const [errors, setErrors] = useState([]);
  const [fields, setFields] = useState<FieldData[] | undefined>(undefined);

  const capNhatHocPhan = async (form?: any) => {
    if (form === undefined) {
      formRef.current?.submit();
      return;
    }
    try {
      const res = await api.hocPhan.capNhatHocPhan(hocPhan.id, form);

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
      handleErrors(error);
      console.log(error);
      setFailed(true);
    } finally {
      onCancel();
    }
  };

  useEffect(() => {
    console.log(hocPhan);
    setFields([
      {
        name: ['tenHocPhan'],
        value: hocPhan.tenHocPhan,
        touched: false,
        errors: [],
        validating: false,
      },
    ]);
  }, [hocPhan]);

  return (
    <Modal
      title={`Cập nhật học phần ${hocPhan.tenHocPhan}`}
      visible={visible}
      okText="Cập nhật"
      cancelText="Huỷ"
      centered
      maskClosable={false}
      onCancel={() => onCancel()}
      onOk={() => capNhatHocPhan()}
    >
      {failed && errors.length > 0 && <Alert message={errors.join('\n')} />}
      <Form
        layout="vertical"
        onFinish={capNhatHocPhan}
        ref={formRef}
        fields={fields}
      >
        <Form.Item label="Tên học phần" name="tenHocPhan">
          <Input placeholder="Nhập tên học phần" allowClear size="large" />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default UpdateHocPhanModal;
