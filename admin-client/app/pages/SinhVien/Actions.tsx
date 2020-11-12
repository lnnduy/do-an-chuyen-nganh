import React, { useState } from 'react';
import { Button, Popconfirm, Space, Tooltip } from 'antd';
import {
  DeleteOutlined,
  QuestionCircleOutlined,
  EditOutlined,
} from '@ant-design/icons';
import UpdateSinhVienModal from './UpdateSinhVienModal';
import handleErrors from '../../shared/handleErrors';
import api from '../../api';

type Props = {
  idLopHoc: number;
  sinhVien: any;
  onUpdated: Function;
  onDeleted: Function;
};

function Actions({ idLopHoc, onUpdated, onDeleted, sinhVien }: Props) {
  const [updateSinhVien, setUpdateSinhVien] = useState(false);

  const deleteSinhVien = async () => {
    try {
      const res = await api.sinhVien.xoaSinhVien(sinhVien.id);

      if (!res.success) {
        handleErrors(res);
      } else {
        onDeleted(sinhVien);
      }
    } catch (error) {
      console.log(error);
      handleErrors(error);
    }
  };

  return (
    <>
      <Space>
        <Tooltip title="Cập nhật sinh viên">
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => setUpdateSinhVien(true)}
          />
        </Tooltip>
        <Popconfirm
          placement="topRight"
          title="Xoá sinh viên？"
          icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
          onConfirm={deleteSinhVien}
        >
          <Tooltip title="Xoá sinh viên">
            <Button type="text" icon={<DeleteOutlined />} />
          </Tooltip>
        </Popconfirm>
      </Space>
      {updateSinhVien && (
        <UpdateSinhVienModal
          visible={updateSinhVien}
          onCancel={setUpdateSinhVien}
          sinhVien={sinhVien}
          idLopHoc={idLopHoc}
          onUpdated={onUpdated}
        />
      )}
    </>
  );
}

export default Actions;
