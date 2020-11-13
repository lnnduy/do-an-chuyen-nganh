import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import actions from '../../store/actions';
import {
  Button,
  Col,
  Input,
  Row,
  Space,
  Table,
  Tooltip,
  notification,
} from 'antd';
import { UserAddOutlined, ReloadOutlined } from '@ant-design/icons';
import columns from './columns';
import AddTaiKhoanModal from './AddTaiKhoanModal';
import handleErrors from '../../shared/handleErrors';
import api from '../../api';
import UpdateTaiKhoanModal from './UpdateTaiKhoanModal';

export default function PageTaiKhoan() {
  const dispatch = useDispatch();
  const [showAddTaiKhoan, setShowAddTaiKhoan] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dsTaiKhoan, setDsTaiKhoan] = useState(new Array<any>());
  const [showUpdateTaiKhoan, setShowUpdateTaiKhoan] = useState(false);
  const [newTaiKhoan, setNewTaiKhoan] = useState<any>(null);

  const loadDsTaiKhoan = useCallback(async () => {
    setLoading(true);

    try {
      const res = await api.taiKhoan.getDsTaiKhoan();

      if (!res.success) {
        handleErrors(res);
        return;
      }

      const dsTaiKhoan = res.data;
      setDsTaiKhoan(dsTaiKhoan);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  }, []);

  const onCreated = (taiKhoan: any) => {
    setDsTaiKhoan([taiKhoan, ...dsTaiKhoan]);
    setShowAddTaiKhoan(false);
    setNewTaiKhoan(taiKhoan);
    setShowUpdateTaiKhoan(true);
    notification['success']({
      message: 'Thành công',
      description: `Tạo tài khoản ${taiKhoan.username} thành công`,
    });
  };

  const onUpdated = (taiKhoan: any) => {
    const taiKhoanIndex = dsTaiKhoan.findIndex((tk) => tk.id === taiKhoan.id);
    const dsTK = [...dsTaiKhoan];
    dsTK.splice(taiKhoanIndex, 1, taiKhoan);
    setDsTaiKhoan(dsTK);
    notification['success']({
      message: 'Thành công',
      description: `Cập nhật thông tin tài khoản ${taiKhoan.username} thành công`,
    });
  };

  const onDeleted = (taiKhoan: any) => {
    const taiKhoanIndex = dsTaiKhoan.findIndex((tk) => tk.id === taiKhoan.id);
    const dsTK = [...dsTaiKhoan];
    dsTK.splice(taiKhoanIndex, 1);
    setDsTaiKhoan(dsTK);
    notification['success']({
      message: 'Thành công',
      description: `Xoá tài khoản ${taiKhoan.username} thành công`,
    });
  };

  useEffect(() => {
    loadDsTaiKhoan();
  }, [loadDsTaiKhoan]);

  useEffect(() => {
    dispatch(actions.app.updateTitle('Quản lý tài khoản'));
  }, []);

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Row justify="space-between">
        <Col span={12}>
          <Input.Search size="large" placeholder="Tìm kiếm tài khoản" />
        </Col>
        <Col span={12}>
          <Row justify="end">
            <Space>
              <Tooltip title="Tải lại">
                <Button
                  type="ghost"
                  icon={<ReloadOutlined />}
                  size="large"
                  onClick={() => loadDsTaiKhoan()}
                />
              </Tooltip>
              <Button
                type="primary"
                icon={<UserAddOutlined />}
                size="large"
                onClick={() => setShowAddTaiKhoan(true)}
              >
                Thêm tài khoản
              </Button>
            </Space>
          </Row>
        </Col>
      </Row>
      <Table
        columns={columns(onUpdated, onDeleted)}
        dataSource={dsTaiKhoan}
        rowKey="id"
        loading={loading}
        bordered
      />
      {showAddTaiKhoan && (
        <AddTaiKhoanModal
          visible={showAddTaiKhoan}
          onCancel={setShowAddTaiKhoan}
          onCreated={onCreated}
        />
      )}
      {showUpdateTaiKhoan && (
        <UpdateTaiKhoanModal
          visible={showUpdateTaiKhoan}
          onCancel={setShowUpdateTaiKhoan}
          taiKhoan={newTaiKhoan}
          onUpdated={onUpdated}
        />
      )}
    </Space>
  );
}
