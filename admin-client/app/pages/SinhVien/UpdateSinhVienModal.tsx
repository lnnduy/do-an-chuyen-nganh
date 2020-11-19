import { Alert, Form, Input, Modal, Select } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import api from '../../api';
import GIOI_TINH from '../../constants/gioi-tinh';
import handleErrors from '../../shared/handleErrors';

type Props = {
  visible: boolean;
  onCancel: Function;
  onUpdated: Function;
  sinhVien: any;
  idLopHoc: number;
};

type FieldData = {
  name: string[];
  value: any;
  touched: boolean;
  validating: boolean;
  errors: string[];
};

function UpdateSinhVienModal({
  visible,
  onCancel,
  onUpdated,
  sinhVien,
}: Props) {
  const formRef = useRef<any>();
  const [failed, setFailed] = useState(false);
  const [errors, setErrors] = useState([]);
  const [fields, setFields] = useState<FieldData[] | undefined>(undefined);

  const capNhatSinhVien = async (form?: any) => {
    if (form === undefined) {
      formRef.current?.submit();
      return;
    }
    try {
      const res = await api.sinhVien.capNhatSinhVien(sinhVien.id, form);

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
    console.log(sinhVien);
    setFields([
      {
        name: ['mssv'],
        value: sinhVien.mssv,
        touched: false,
        errors: [],
        validating: false,
      },
      {
        name: ['hoTen'],
        value: sinhVien.hoTen,
        touched: false,
        errors: [],
        validating: false,
      },
      {
        name: ['email'],
        value: sinhVien.email,
        touched: false,
        errors: [],
        validating: false,
      },
      {
        name: ['soDienThoai'],
        value: sinhVien.soDienThoai,
        touched: false,
        errors: [],
        validating: false,
      },
      {
        name: ['diaChi'],
        value: sinhVien.diaChi,
        touched: false,
        errors: [],
        validating: false,
      },
      {
        name: ['gioiTinh'],
        value: sinhVien.gioiTinh,
        touched: false,
        errors: [],
        validating: false,
      },
    ]);
  }, [sinhVien]);

  return (
    <Modal
      style={{ paddingTop: 40 }}
      title={`Cập nhật sinh viên ${sinhVien.hoTen}`}
      visible={visible}
      okText="Cập nhật"
      cancelText="Huỷ"
      centered
      maskClosable={false}
      onCancel={() => onCancel()}
      onOk={() => capNhatSinhVien()}
    >
      {failed && errors.length > 0 && <Alert message={errors.join('\n')} />}
      <Form
        layout="vertical"
        onFinish={capNhatSinhVien}
        ref={formRef}
        fields={fields}
      >
        <Form.Item label="MSSV" name="mssv">
          <Input placeholder="Nhập MSSV" allowClear size="large" />
        </Form.Item>
        <Form.Item label="Họ tên" name="hoTen">
          <Input placeholder="Nhập họ tên" allowClear size="large" />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input placeholder="Nhập email" allowClear size="large" />
        </Form.Item>
        <Form.Item label="Số điện thoại" name="soDienThoai">
          <Input placeholder="Nhập số điện thoại" allowClear size="large" />
        </Form.Item>
        <Form.Item label="Địa chỉ" name="diaChi">
          <Input placeholder="Nhập địa chỉ" allowClear size="large" />
        </Form.Item>
        <Form.Item label="Giới tính" name="gioiTinh">
          <Select>
            <Select.Option value={GIOI_TINH.NAM}>{GIOI_TINH.NAM}</Select.Option>
            <Select.Option value={GIOI_TINH.NU}>{GIOI_TINH.NU}</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default UpdateSinhVienModal;
