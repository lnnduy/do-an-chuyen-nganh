import React, { useState } from 'react';
import { Button, Popconfirm, Space, Tooltip } from 'antd';
import {
  DeleteOutlined,
  QuestionCircleOutlined,
  EditOutlined,
} from '@ant-design/icons';
import UpdateKhoCauHoiModal from './UpdateKhoCauHoiModal';
import handleErrors from '../../shared/handleErrors';
import api from '../../api';

type Props = {
  idHocPhan: number;
  khoCauHoi: any;
  onUpdated: Function;
  onDeleted: Function;
};

function Actions({ idHocPhan, onUpdated, onDeleted, khoCauHoi }: Props) {
  const [updateKhoCauHoi, setUpdateKhoCauHoi] = useState(false);

  const deleteKhoCauHoi = async () => {
    try {
      const res = await api.khoCauHoi.xoaKhoCauHoi(khoCauHoi.id);

      if (!res.success) {
        handleErrors(res);
      } else {
        onDeleted(khoCauHoi);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Space>
        <Tooltip title="Cập nhật kho câu hỏi">
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => setUpdateKhoCauHoi(true)}
          />
        </Tooltip>
        <Popconfirm
          placement="topRight"
          title="Xoá kho câu hỏi？"
          icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
          onConfirm={deleteKhoCauHoi}
        >
          <Tooltip title="Xoá kho câu hỏi">
            <Button type="text" icon={<DeleteOutlined />} />
          </Tooltip>
        </Popconfirm>
      </Space>
      {updateKhoCauHoi && (
        <UpdateKhoCauHoiModal
          visible={updateKhoCauHoi}
          onCancel={setUpdateKhoCauHoi}
          khoCauHoi={khoCauHoi}
          idHocPhan={idHocPhan}
          onUpdated={onUpdated}
        />
      )}
    </>
  );
}

export default Actions;
