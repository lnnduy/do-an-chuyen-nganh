import React, { useState } from 'react';
import { Button, Popconfirm, Space, Tooltip } from 'antd';
import {
  DeleteOutlined,
  QuestionCircleOutlined,
  EditOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import UpdateDeThiModal from './UpdateDeThiModal';
import handleErrors from '../../shared/handleErrors';
import api from '../../api';
import XemChiTietModal from './XemChiTietModal';

type Props = {
  idHocPhan: number;
  deThi: any;
  onUpdated: Function;
  onDeleted: Function;
};

function Actions({ idHocPhan, onUpdated, onDeleted, deThi }: Props) {
  const [updateDeThi, setUpdateDeThi] = useState(false);
  const [xemChiTiet, setXemChiTiet] = useState(false);

  const deleteDeThi = async () => {
    try {
      const res = await api.deThi.xoaDeThi(deThi.id);

      if (!res.success) {
        handleErrors(res);
        console.log(res.errors);
        return;
      }

      onDeleted(deThi);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Space>
        <Tooltip title="Xem chi tiết">
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={() => setXemChiTiet(true)}
          />
        </Tooltip>
        <Tooltip title="Cập nhật đề thi">
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => setUpdateDeThi(true)}
          />
        </Tooltip>
        <Popconfirm
          placement="topRight"
          title="Xoá đề thi？"
          icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
          onConfirm={deleteDeThi}
        >
          <Tooltip title="Xoá đề thi">
            <Button type="text" icon={<DeleteOutlined />} />
          </Tooltip>
        </Popconfirm>
      </Space>
      {xemChiTiet && (
        <XemChiTietModal
          visible={xemChiTiet}
          deThi={deThi}
          onClose={setXemChiTiet}
        />
      )}
      {updateDeThi && (
        <UpdateDeThiModal
          visible={updateDeThi}
          onCancel={setUpdateDeThi}
          deThi={deThi}
          idHocPhan={idHocPhan}
          onUpdated={onUpdated}
        />
      )}
    </>
  );
}

export default Actions;
