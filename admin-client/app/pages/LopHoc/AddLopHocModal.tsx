import { Alert, Form, Input, Modal } from 'antd';
import React, { useRef, useState } from 'react';
import api from '../../api';
import handleErrors from '../../shared/handleErrors';

type Props = {
  visible: boolean;
  onCancel: Function;
  onCreated: Function;
};

function AddLopHocModal({ visible, onCancel, onCreated }: Props) {
  const formRef = useRef<any>();
  const [failed, setFailed] = useState(false);
  const [errors, setErrors] = useState([]);

  const taoLopHoc = async (form?: any) => {
    if (form === undefined) {
      formRef.current?.submit();
      return;
    }
    try {
      const res = await api.lopHoc.taoLopHoc(form);

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
      console.log(error);
      setFailed(true);
    }
  };

  return (
    <Modal
      title="Tạo lớp học"
      visible={visible}
      okText="Tạo lớp học"
      cancelText="Huỷ"
      centered
      maskClosable={false}
      onCancel={() => onCancel()}
      onOk={() => taoLopHoc()}
    >
      {failed && errors.length > 0 && <Alert message={errors.join('\n')} />}
      <Form layout="vertical" onFinish={taoLopHoc} ref={formRef}>
        <Form.Item
          label="Tên lớp học"
          name="tenLopHoc"
          rules={[{ required: true, message: 'Chưa nhập thông tin' }]}
        >
          <Input placeholder="Nhập tên lớp học" allowClear size="large" />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddLopHocModal;
