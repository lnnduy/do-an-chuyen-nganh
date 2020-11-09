import React, { useState } from 'react';
import { Button, Popconfirm, Space, Tooltip } from 'antd';
import {
  DeleteOutlined,
  QuestionCircleOutlined,
  EditOutlined,
} from '@ant-design/icons';
import UpdateHocPhanModal from './UpdateHocPhanModal';
import handleErrors from '../../shared/handleErrors';
import api from '../../api';

type Props = {
  hocPhan: any;
  onUpdated: Function;
  onDeleted: Function;
};

function Actions({ hocPhan, onUpdated, onDeleted }: Props) {
  const [updateHocPhan, setUpdateHocPhan] = useState(false);

  const deleteHocPhan = async () => {
    try {
      const res = await api.hocPhan.xoaHocPhan(hocPhan.id);

      if (!res.success) {
        handleErrors(res);
      } else {
        onDeleted(hocPhan);
      }
    } catch (error) {
      console.log(error);
      handleErrors(error);
    }
  };

  return (
    <>
      <Space>
        <Tooltip title="Cập nhật học phần">
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => setUpdateHocPhan(true)}
          />
        </Tooltip>
        <Popconfirm
          placement="topRight"
          title="Xoá học phần？"
          icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
          onConfirm={deleteHocPhan}
        >
          <Tooltip title="Xoá học phần">
            <Button type="text" icon={<DeleteOutlined />} />
          </Tooltip>
        </Popconfirm>
      </Space>
      {updateHocPhan && (
        <UpdateHocPhanModal
          visible={updateHocPhan}
          onCancel={setUpdateHocPhan}
          hocPhan={hocPhan}
          onUpdated={onUpdated}
        />
      )}
    </>
  );
}

export default Actions;
