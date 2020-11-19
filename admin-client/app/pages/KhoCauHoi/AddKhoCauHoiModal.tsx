import { Alert, Input, Form, Modal } from 'antd';
import React, { useRef, useState } from 'react';
import api from '../../api';
import handleErrors from '../../shared/handleErrors';

type Props = {
  idHocPhan: number;
  visible: boolean;
  onCancel: Function;
  onCreated: Function;
};

function AddKhoCauHoiModal({ visible, onCancel, onCreated, idHocPhan }: Props) {
  const formRef = useRef<any>();
  const [failed, setFailed] = useState(false);
  const [errors, setErrors] = useState([]);

  const taoKhoCauHoi = async (form?: any) => {
    if (form === undefined) {
      formRef.current?.submit();
      return;
    }
    try {
      const res = await api.khoCauHoi.themKhoCauHoiVaoHocPhan(idHocPhan, form);

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
      style={{ paddingTop: 40 }}
      title="Tạo kho câu hỏi"
      visible={visible}
      okText="Tạo kho câu hỏi"
      cancelText="Huỷ"
      centered
      maskClosable={false}
      onCancel={() => onCancel()}
      onOk={() => taoKhoCauHoi()}
    >
      {failed && errors.length > 0 && <Alert message={errors.join('\n')} />}
      <Form layout="vertical" onFinish={taoKhoCauHoi} ref={formRef}>
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

export default AddKhoCauHoiModal;
