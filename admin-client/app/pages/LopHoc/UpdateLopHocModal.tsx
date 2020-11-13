import { Alert, Form, Input, Modal } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import api from '../../api';
import handleErrors from '../../shared/handleErrors';

type Props = {
  visible: boolean;
  onCancel: Function;
  onUpdated: Function;
  lopHoc: any;
};

type FieldData = {
  name: string[];
  value: any;
  touched: boolean;
  validating: boolean;
  errors: string[];
};

function UpdateLopHocModal({ visible, onCancel, onUpdated, lopHoc }: Props) {
  const formRef = useRef<any>();
  const [failed, setFailed] = useState(false);
  const [errors, setErrors] = useState([]);
  const [fields, setFields] = useState<FieldData[] | undefined>(undefined);

  const capNhatLopHoc = async (form?: any) => {
    if (form === undefined) {
      formRef.current?.submit();
      return;
    }
    try {
      const res = await api.lopHoc.capNhatLopHoc(lopHoc.id, form);

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
    console.log(lopHoc);
    setFields([
      {
        name: ['tenLopHoc'],
        value: lopHoc.tenLop,
        touched: false,
        errors: [],
        validating: false,
      },
    ]);
  }, [lopHoc]);

  return (
    <Modal
      title={`Cập nhật lớp học ${lopHoc.tenLop}`}
      visible={visible}
      okText="Cập nhật"
      cancelText="Huỷ"
      centered
      maskClosable={false}
      onCancel={() => onCancel()}
      onOk={() => capNhatLopHoc()}
    >
      {failed && errors.length > 0 && <Alert message={errors.join('\n')} />}
      <Form
        layout="vertical"
        onFinish={capNhatLopHoc}
        ref={formRef}
        fields={fields}
      >
        <Form.Item label="Tên lớp học" name="tenLopHoc">
          <Input placeholder="Nhập tên lớp học" allowClear size="large" />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default UpdateLopHocModal;
