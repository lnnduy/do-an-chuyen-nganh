import { Alert, Form, Input, Modal } from 'antd';
import React, { useRef, useState } from 'react';
import api from '../../api';
import handleErrors from '../../shared/handleErrors';

type Props = {
  visible: boolean;
  onCancel: Function;
  onCreated: Function;
};

function AddHocPhanModal({ visible, onCancel, onCreated }: Props) {
  const formRef = useRef<any>();
  const [failed, setFailed] = useState(false);
  const [errors, setErrors] = useState([]);

  const taoHocPhan = async (form?: any) => {
    if (form === undefined) {
      formRef.current?.submit();
      return;
    }
    try {
      const res = await api.hocPhan.taoHocPhan(form);

      if (!res.success) {
        if (res.statusCode === 400) {
          setErrors(res.errors);
          setFailed(true);
        } else {
          handleErrors(res);
          setFailed(true);
        }
      }

      onCreated(res.data);
    } catch (error) {
      handleErrors(error);
      console.log(error);
      setFailed(true);
    }
  };

  return (
    <Modal
      title="Tạo học phần"
      visible={visible}
      okText="Tạo học phần"
      cancelText="Huỷ"
      centered
      maskClosable={false}
      onCancel={() => onCancel()}
      onOk={() => taoHocPhan()}
    >
      {failed && errors.length > 0 && <Alert message={errors.join('\n')} />}
      <Form layout="vertical" onFinish={taoHocPhan} ref={formRef}>
        <Form.Item
          label="Tên học phần"
          name="tenHocPhan"
          rules={[{ required: true, message: 'Chưa nhập thông tin' }]}
        >
          <Input placeholder="Nhập tên học phần" allowClear size="large" />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddHocPhanModal;
