import {
  Button,
  Col,
  Input,
  notification,
  Row,
  Space,
  Table,
  Tooltip,
} from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { ReloadOutlined, UserAddOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import api from '../../api';
import handleErrors from '../../shared/handleErrors';
import actions from '../../store/actions';
import columns from './columns';
import AddHocPhanModal from './AddHocPhanModal';

function PageHocPhan() {
  const dispatch = useDispatch();
  const [showAddHocPhan, setShowAddHocPhan] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dsHocPhan, setDsHocPhan] = useState(new Array<any>());

  const loadDsHocPhan = useCallback(async () => {
    setLoading(true);

    try {
      const res = await api.hocPhan.getDsHocPhan();

      if (!res.success) {
        handleErrors(res);
        return;
      }

      const dsHocPhan = res.data;
      setDsHocPhan(dsHocPhan);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  }, []);

  const onCreated = (hocPhan: any) => {
    setDsHocPhan([hocPhan, ...dsHocPhan]);
    setShowAddHocPhan(false);
    notification['success']({
      message: 'Thành công',
      description: `Tạo học phần ${hocPhan.tenHocPhan} thành công`,
    });
  };

  const onUpdated = (hocPhan: any) => {
    const hocPhanIndex = dsHocPhan.findIndex((tk) => tk.id === hocPhan.id);
    const dsHP = [...dsHocPhan];
    dsHP.splice(hocPhanIndex, 1, hocPhan);
    setDsHocPhan(dsHP);
    notification['success']({
      message: 'Thành công',
      description: `Cập nhật thông tin học phần ${hocPhan.tenHocPhan} thành công`,
    });
  };

  const onDeleted = (hocPhan: any) => {
    const hocPhanIndex = dsHocPhan.findIndex((tk) => tk.id === hocPhan.id);
    const dsHP = [...dsHocPhan];
    dsHP.splice(hocPhanIndex, 1);
    setDsHocPhan(dsHP);
    notification['success']({
      message: 'Thành công',
      description: `Xoá học phần ${hocPhan.tenHocPhan} thành công`,
    });
  };

  useEffect(() => {
    loadDsHocPhan();
  }, [loadDsHocPhan]);

  useEffect(() => {
    dispatch(actions.app.updateTitle('Quản lý học phần'));
  }, []);

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Row justify="space-between">
        <Col span={12}>
          <Input.Search size="large" placeholder="Tìm kiếm học phần" />
        </Col>
        <Col span={12}>
          <Row justify="end">
            <Space>
              <Tooltip title="Tải lại">
                <Button
                  type="ghost"
                  icon={<ReloadOutlined />}
                  size="large"
                  onClick={() => loadDsHocPhan()}
                />
              </Tooltip>
              <Button
                type="primary"
                icon={<UserAddOutlined />}
                size="large"
                onClick={() => setShowAddHocPhan(true)}
              >
                Thêm học phần
              </Button>
            </Space>
          </Row>
        </Col>
      </Row>
      <Table
        columns={columns(onUpdated, onDeleted)}
        dataSource={dsHocPhan}
        loading={loading}
        bordered
      />
      {showAddHocPhan && (
        <AddHocPhanModal
          visible={showAddHocPhan}
          onCancel={setShowAddHocPhan}
          onCreated={onCreated}
        />
      )}
    </Space>
  );
}

export default PageHocPhan;
