import React, { useState } from 'react';
import { Button, Popconfirm, Space, Tooltip } from 'antd';
import {
  DeleteOutlined,
  QuestionCircleOutlined,
  EditOutlined,
  FileUnknownOutlined,
  FileTextOutlined,
  ScheduleOutlined,
} from '@ant-design/icons';
import UpdateHocPhanModal from './UpdateHocPhanModal';
import handleErrors from '../../shared/handleErrors';
import api from '../../api';
import { useHistory } from 'react-router';
import ROUTES from '../../constants/routes';

type Props = {
  hocPhan: any;
  onUpdated: Function;
  onDeleted: Function;
};

function Actions({ hocPhan, onUpdated, onDeleted }: Props) {
  const history = useHistory();
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
    }
  };

  return (
    <>
      <Space>
        <Tooltip title="Quản lý kho câu hỏi">
          <Button
            type="text"
            icon={<FileUnknownOutlined />}
            onClick={() =>
              history.push(`${ROUTES.HOC_PHAN}/${hocPhan.id}/kho-cau-hoi`)
            }
          />
        </Tooltip>
        <Tooltip title="Quản lý đề thi">
          <Button
            type="text"
            icon={<FileTextOutlined />}
            onClick={() =>
              history.push(`${ROUTES.HOC_PHAN}/${hocPhan.id}/de-thi`)
            }
          />
        </Tooltip>
        <Tooltip title="Quản lý ca thi">
          <Button
            type="text"
            icon={<ScheduleOutlined />}
            onClick={() =>
              history.push(`${ROUTES.HOC_PHAN}/${hocPhan.id}/ca-thi`)
            }
          />
        </Tooltip>
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
