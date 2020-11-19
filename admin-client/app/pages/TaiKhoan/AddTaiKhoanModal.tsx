import { Alert, Form, Input, Modal, Select } from 'antd';
import React, { useRef, useState } from 'react';
import api from '../../api';
import QUYEN_TRUY_CAP from '../../constants/quyen-truy-cap';
import handleErrors from '../../shared/handleErrors';

type Props = {
  visible: boolean;
  onCancel: Function;
  onCreated: Function;
};

function AddTaiKhoanModal({ visible, onCancel, onCreated }: Props) {
  const formRef = useRef<any>();
  const [failed, setFailed] = useState(false);
  const [errors, setErrors] = useState([]);

  const taoTaiKhoan = async (form?: any) => {
    if (form === undefined) {
      formRef.current?.submit();
      return;
    }
    try {
      const res = await api.taiKhoan.taoTaiKhoan(form);

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
      title="Tạo tài khoản"
      visible={visible}
      okText="Tạo tài khoản"
      cancelText="Huỷ"
      centered
      maskClosable={false}
      onCancel={() => onCancel()}
      onOk={() => taoTaiKhoan()}
    >
      {failed && errors.length > 0 && <Alert message={errors.join('\n')} />}
      <Form layout="vertical" onFinish={taoTaiKhoan} ref={formRef}>
        <Form.Item
          label="Tên tài khoản"
          name="username"
          rules={[{ required: true, message: 'Chưa nhập thông tin' }]}
        >
          <Input placeholder="Nhập tên đăng nhập" allowClear size="large" />
        </Form.Item>
        <Form.Item
          label="Mật khẩu"
          name="matKhau"
          rules={[
            { min: 6, message: 'Mật khẩu cần có ít nhất 6 ký tự' },
            { max: 20, message: 'Mật khẩu chứa tối đa 20 ký tự' },
          ]}
        >
          <Input.Password
            placeholder="Nhập mật khẩu. Khi bỏ trống sẽ lấy mặc định là: 123456"
            allowClear
            visibilityToggle
            size="large"
          />
        </Form.Item>
        <Form.Item
          label="Quyền truy cập"
          name="quyenTruyCap"
          rules={[{ required: true, message: 'Chưa chọn thông tin' }]}
        >
          <Select allowClear size="large">
            <Select.Option value={QUYEN_TRUY_CAP.CAN_BO}>
              {QUYEN_TRUY_CAP.CAN_BO}
            </Select.Option>
            <Select.Option value={QUYEN_TRUY_CAP.QUAN_TRI_VIEN}>
              {QUYEN_TRUY_CAP.QUAN_TRI_VIEN}
            </Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddTaiKhoanModal;
