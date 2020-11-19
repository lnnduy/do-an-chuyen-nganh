import { Alert, Form, Input, Modal, Select } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import api from '../../api';
import GIOI_TINH from '../../constants/gioi-tinh';
import handleErrors from '../../shared/handleErrors';

type Props = {
  visible: boolean;
  onCancel: Function;
  onUpdated: Function;
  taiKhoan: any;
};

type FieldData = {
  name: string[];
  value: any;
  touched: boolean;
  validating: boolean;
  errors: string[];
};

function UpdateTaiKhoanModal({
  visible,
  onCancel,
  onUpdated,
  taiKhoan,
}: Props) {
  const formRef = useRef<any>();
  const [failed, setFailed] = useState(false);
  const [errors, setErrors] = useState([]);
  const [fields, setFields] = useState<FieldData[] | undefined>(undefined);

  const capNhatTaiKhoan = async (form?: any) => {
    if (form === undefined) {
      formRef.current?.submit();
      return;
    }
    try {
      const res = await api.taiKhoan.capNhatTaiKhoan(taiKhoan.id, form);

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
    setFields([
      {
        name: ['hoTen'],
        value: taiKhoan.hoTen,
        touched: false,
        errors: [],
        validating: false,
      },
      {
        name: ['email'],
        value: taiKhoan.email,
        touched: false,
        errors: [],
        validating: false,
      },
      {
        name: ['soDienThoai'],
        value: taiKhoan.soDienThoai,
        touched: false,
        errors: [],
        validating: false,
      },
      {
        name: ['gioiTinh'],
        value: taiKhoan.gioiTinh,
        touched: false,
        errors: [],
        validating: false,
      },
    ]);
  }, [taiKhoan]);

  return (
    <Modal
      style={{ paddingTop: 40 }}
      title={`Cập nhật tài khoản ${taiKhoan.username}`}
      visible={visible}
      okText="Cập nhật"
      cancelText="Huỷ"
      centered
      maskClosable={false}
      onCancel={() => onCancel()}
      onOk={() => capNhatTaiKhoan()}
    >
      {failed && errors.length > 0 && <Alert message={errors.join('\n')} />}
      <Form
        layout="vertical"
        onFinish={capNhatTaiKhoan}
        ref={formRef}
        fields={fields}
      >
        <Form.Item label="Họ và tên" name="hoTen">
          <Input placeholder="Nhập họ và tên" allowClear size="large" />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input placeholder="Nhập email" allowClear size="large" />
        </Form.Item>
        <Form.Item label="Số điện thoại" name="soDienThoai">
          <Input placeholder="Nhập số điện thoại" allowClear size="large" />
        </Form.Item>
        <Form.Item label="Giới tính" name="gioiTinh">
          <Select allowClear size="large" placeholder="Chọn giới tính">
            <Select.Option value={GIOI_TINH.NAM}>{GIOI_TINH.NAM}</Select.Option>
            <Select.Option value={GIOI_TINH.NU}>{GIOI_TINH.NU}</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default UpdateTaiKhoanModal;
