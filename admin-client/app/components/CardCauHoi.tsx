import { Card, Space, Tooltip, Typography, Popconfirm } from 'antd';
import React, { useState } from 'react';
import {
  EditOutlined,
  DeleteOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import UpdateCauHoiModal from '../pages/CauHoi/UpdateCauHoiModal';
import handleErrors from '../shared/handleErrors';
import api from '../api';
import DoKhoCauHoi from './DoKhoCauHoi';

type Props = {
  cauHoi: any;
  onUpdated?: Function;
  onDeleted?: Function;
  actions?: boolean;
};

function CardCauHoi({
  cauHoi,
  onUpdated = () => {},
  onDeleted = () => {},
  actions = true,
}: Props) {
  const [showUpdateCauHoi, setShowUpdateCauHoi] = useState(false);

  const deleteCauHoi = async () => {
    try {
      const res = await api.cauHoi.xoaCauHoi(cauHoi.id);

      if (!res.success) {
        handleErrors(res);
        console.log(res.errors);
        return;
      }

      onDeleted(cauHoi);
    } catch (error) {
      handleErrors(error);
      console.log(error);
    }
  };

  return (
    <Card
      className="card-cau-hoi"
      actions={
        (actions && [
          <Tooltip title="Cập nhật câu hỏi">
            <EditOutlined onClick={() => setShowUpdateCauHoi(true)} />
          </Tooltip>,
          <Popconfirm
            title="Xoá câu hỏi"
            cancelText="Huỷ"
            okText="Xoá"
            icon={<CloseCircleOutlined style={{ color: 'red' }} />}
            onConfirm={deleteCauHoi}
          >
            <Tooltip title="Xoá câu hỏi">
              <DeleteOutlined />
            </Tooltip>
          </Popconfirm>,
        ]) ||
        []
      }
    >
      <DoKhoCauHoi doKho={cauHoi.doKho} />
      <Typography.Title level={4}>
        <pre>{cauHoi.noiDung}</pre>
      </Typography.Title>
      <Space direction="vertical" style={{ width: '100%', flex: 'auto' }}>
        {cauHoi.dsDapAn.map((dapAn: any) => (
          <Card
            key={dapAn.Id}
            className={dapAn.dapAnDung ? 'card-dap-an-dung' : 'card-dap-an-sai'}
            style={{
              borderColor: dapAn.dapAnDung ? '#4EF9B0' : '#FF5045',
              backgroundColor: dapAn.dapAnDung ? '#4EF9B005' : '#FF504505',
              color: '#FFFE',
              fontSize: 16,
            }}
          >
            <Typography.Text>
              <pre>{dapAn.noiDung}</pre>
            </Typography.Text>
          </Card>
        ))}
      </Space>
      {showUpdateCauHoi && (
        <UpdateCauHoiModal
          cauHoi={cauHoi}
          visible={showUpdateCauHoi}
          onCancel={() => setShowUpdateCauHoi(false)}
          onUpdated={(cauHoi: any) => {
            onUpdated(cauHoi);
            setShowUpdateCauHoi(false);
          }}
        />
      )}
    </Card>
  );
}

export default CardCauHoi;
