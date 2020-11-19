import { Alert, Input, Select, Form, Modal } from 'antd';
import React, { useRef, useState } from 'react';
import api from '../../api';
import GIOI_TINH from '../../constants/gioi-tinh';
import handleErrors from '../../shared/handleErrors';

type Props = {
  idLopHoc: number;
  visible: boolean;
  onCancel: Function;
  onCreated: Function;
};

function AddSinhVienModal({ visible, onCancel, onCreated, idLopHoc }: Props) {
  const formRef = useRef<any>();
  const [failed, setFailed] = useState(false);
  const [errors, setErrors] = useState([]);

  const taoSinhVien = async (form?: any) => {
    if (form === undefined) {
      formRef.current?.submit();
      return;
    }
    try {
      const res = await api.sinhVien.themSinhVienVaoLop(idLopHoc, form);

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
      title="Tạo sinh viên"
      visible={visible}
      okText="Tạo sinh viên"
      cancelText="Huỷ"
      centered
      maskClosable={false}
      onCancel={() => onCancel()}
      onOk={() => taoSinhVien()}
    >
      {failed && errors.length > 0 && <Alert message={errors.join('\n')} />}
      <Form layout="vertical" onFinish={taoSinhVien} ref={formRef}>
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

export default AddSinhVienModal;
