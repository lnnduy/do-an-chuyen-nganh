import React, { useState } from 'react';
import { Button, Popconfirm, Space, Tooltip } from 'antd';
import {
  DeleteOutlined,
  QuestionCircleOutlined,
  EditOutlined,
  FundOutlined,
} from '@ant-design/icons';
import UpdateCaThiModal from './UpdateCaThiModal';
import handleErrors from '../../shared/handleErrors';
import api from '../../api';
import XemKetQuaModal from './XemKetQuaModal';

type Props = {
  idHocPhan: number;
  caThi: any;
  onUpdated: Function;
  onDeleted: Function;
};

function Actions({ idHocPhan, onUpdated, onDeleted, caThi }: Props) {
  const [updateCaThi, setUpdateCaThi] = useState(false);
  const [showXemKetQua, setShowXemKetQua] = useState(false);

  const deleteCaThi = async () => {
    try {
      const res = await api.caThi.xoaCaThi(caThi.id);

      if (!res.success) {
        handleErrors(res);
        console.log(res.errors);
        return;
      }

      onDeleted(caThi);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Space>
        <Tooltip title="Xem kết quả">
          <Button
            type="text"
            icon={<FundOutlined />}
            onClick={() => setShowXemKetQua(true)}
          />
        </Tooltip>
        <Tooltip title="Cập nhật ca thi">
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => setUpdateCaThi(true)}
          />
        </Tooltip>
        <Popconfirm
          placement="topRight"
          title="Xoá ca thi？"
          icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
          onConfirm={deleteCaThi}
        >
          <Tooltip title="Xoá ca thi">
            <Button type="text" icon={<DeleteOutlined />} />
          </Tooltip>
        </Popconfirm>
      </Space>
      {updateCaThi && (
        <UpdateCaThiModal
          visible={updateCaThi}
          onCancel={setUpdateCaThi}
          caThi={caThi}
          idHocPhan={idHocPhan}
          onUpdated={onUpdated}
        />
      )}
      {showXemKetQua && (
        <XemKetQuaModal
          idCaThi={caThi.id}
          visible={showXemKetQua}
          onCancel={setShowXemKetQua}
        />
      )}
    </>
  );
}

export default Actions;
