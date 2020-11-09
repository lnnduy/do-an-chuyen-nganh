import React, { useState } from 'react';
import { Button, Popconfirm, Space, Tooltip } from 'antd';
import {
  DeleteOutlined,
  QuestionCircleOutlined,
  EditOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import UpdateLopHocModal from './UpdateLopHocModal';
import handleErrors from '../../shared/handleErrors';
import api from '../../api';

type Props = {
  lopHoc: any;
  onUpdated: Function;
  onDeleted: Function;
};

function Actions({ lopHoc, onUpdated, onDeleted }: Props) {
  const [updateLopHoc, setUpdateLopHoc] = useState(false);

  const deleteLopHoc = async () => {
    try {
      const res = await api.lopHoc.xoaLopHoc(lopHoc.id);

      if (!res.success) {
        handleErrors(res);
      } else {
        onDeleted(lopHoc);
      }
    } catch (error) {
      console.log(error);
      handleErrors(error);
    }
  };

  return (
    <>
      <Space>
        <Tooltip title="Quản lý học viên">
          <Button
            type="text"
            icon={<TeamOutlined />}
            onClick={() => setUpdateLopHoc(true)}
          />
        </Tooltip>
        <Tooltip title="Cập nhật lớp học">
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => setUpdateLopHoc(true)}
          />
        </Tooltip>
        <Popconfirm
          placement="topRight"
          title="Xoá lớp học？"
          icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
          onConfirm={deleteLopHoc}
        >
          <Tooltip title="Xoá lớp học">
            <Button type="text" icon={<DeleteOutlined />} />
          </Tooltip>
        </Popconfirm>
      </Space>
      {updateLopHoc && (
        <UpdateLopHocModal
          visible={updateLopHoc}
          onCancel={setUpdateLopHoc}
          lopHoc={lopHoc}
          onUpdated={onUpdated}
        />
      )}
    </>
  );
}

export default Actions;
