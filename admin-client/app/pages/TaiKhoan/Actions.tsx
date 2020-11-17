import React, { useState } from 'react';
import { Button, Popconfirm, Space, Tooltip } from 'antd';
import {
  DeleteOutlined,
  QuestionCircleOutlined,
  EditOutlined,
} from '@ant-design/icons';
import UpdateTaiKhoanModal from './UpdateTaiKhoanModal';
import handleErrors from '../../shared/handleErrors';
import api from '../../api';

type Props = {
  taiKhoan: any;
  onUpdated: Function;
  onDeleted: Function;
};

function Actions({ taiKhoan, onUpdated, onDeleted }: Props) {
  const [updateTaiKhoan, setUpdateTaiKhoan] = useState(false);

  const deleteTaiKhoan = async () => {
    try {
      const res = await api.taiKhoan.xoaTaiKhoan(taiKhoan.id);

      if (!res.success) {
        handleErrors(res);
      } else {
        onDeleted(taiKhoan);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Space>
        <Tooltip title="Cập nhật tài khoản">
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => setUpdateTaiKhoan(true)}
          />
        </Tooltip>
        <Popconfirm
          placement="topRight"
          title="Xoá tài khoản？"
          icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
          onConfirm={deleteTaiKhoan}
        >
          <Tooltip title="Xoá tài khoản">
            <Button type="text" icon={<DeleteOutlined />} />
          </Tooltip>
        </Popconfirm>
      </Space>
      <UpdateTaiKhoanModal
        visible={updateTaiKhoan}
        onCancel={setUpdateTaiKhoan}
        taiKhoan={taiKhoan}
        onUpdated={onUpdated}
      />
    </>
  );
}

export default Actions;
