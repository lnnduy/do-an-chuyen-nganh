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
import AddLopHocModal from './AddLopHocModal';

function PageLopHoc() {
  const dispatch = useDispatch();
  const [showAddLopHoc, setShowAddLopHoc] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dsLopHoc, setDsLopHoc] = useState(new Array<any>());

  const loadDsLopHoc = useCallback(async () => {
    setLoading(true);

    try {
      const res = await api.lopHoc.getDsLopHoc();

      if (!res.success) {
        handleErrors(res);
        return;
      }

      const dsLopHoc = res.data;
      setDsLopHoc(dsLopHoc);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  }, []);

  const onCreated = (lopHoc: any) => {
    setDsLopHoc([lopHoc, ...dsLopHoc]);
    setShowAddLopHoc(false);
    notification['success']({
      message: 'Thành công',
      description: `Tạo lớp học ${lopHoc.tenLop} thành công`,
    });
  };

  const onUpdated = (lopHoc: any) => {
    const lopHocIndex = dsLopHoc.findIndex((tk) => tk.id === lopHoc.id);
    const dsHP = [...dsLopHoc];
    dsHP.splice(lopHocIndex, 1, lopHoc);
    setDsLopHoc(dsHP);
    notification['success']({
      message: 'Thành công',
      description: `Cập nhật thông tin lớp học ${lopHoc.tenLop} thành công`,
    });
  };

  const onDeleted = (lopHoc: any) => {
    const lopHocIndex = dsLopHoc.findIndex((tk) => tk.id === lopHoc.id);
    const dsHP = [...dsLopHoc];
    dsHP.splice(lopHocIndex, 1);
    setDsLopHoc(dsHP);
    notification['success']({
      message: 'Thành công',
      description: `Xoá lớp học ${lopHoc.tenLop} thành công`,
    });
  };

  useEffect(() => {
    loadDsLopHoc();
  }, [loadDsLopHoc]);

  useEffect(() => {
    dispatch(actions.app.updateTitle('Quản lý lớp học'));
  }, []);

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Row justify="space-between">
        <Col span={12}>
          <Input.Search size="large" placeholder="Tìm kiếm lớp học" />
        </Col>
        <Col span={12}>
          <Row justify="end">
            <Space>
              <Tooltip title="Tải lại">
                <Button
                  type="ghost"
                  icon={<ReloadOutlined />}
                  size="large"
                  onClick={() => loadDsLopHoc()}
                />
              </Tooltip>
              <Button
                type="primary"
                icon={<UserAddOutlined />}
                size="large"
                onClick={() => setShowAddLopHoc(true)}
              >
                Thêm lớp học
              </Button>
            </Space>
          </Row>
        </Col>
      </Row>
      <Table
        columns={columns(onUpdated, onDeleted)}
        dataSource={dsLopHoc}
        loading={loading}
        bordered
      />
      {showAddLopHoc && (
        <AddLopHocModal
          visible={showAddLopHoc}
          onCancel={setShowAddLopHoc}
          onCreated={onCreated}
        />
      )}
    </Space>
  );
}

export default PageLopHoc;
