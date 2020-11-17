import {
  Space,
  Row,
  Col,
  Input,
  Tooltip,
  Button,
  Table,
  notification,
  Typography,
} from 'antd';
import {
  ReloadOutlined,
  UserAddOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons';
import React, { useCallback, useEffect, useState } from 'react';
import columns from './columns';
import { useDispatch } from 'react-redux';
import api from '../../api';
import handleErrors from '../../shared/handleErrors';
import actions from '../../store/actions';
import AddSinhVienModal from './AddSinhVienModal';
import ROUTES from '../../constants/routes';
import { useHistory } from 'react-router';

type Props = {
  match: any;
};

function PageSinhVien({ match }: Props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showAddSinhVien, setShowAddSinhVien] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dsSinhVien, setDsSinhVien] = useState(new Array<any>());
  const [lopHoc, setLopHoc] = useState<any>(null);

  const loadDsSinhVien = useCallback(async () => {
    setLoading(true);

    try {
      const res = await api.sinhVien.getDanhSachLop(match.params.idLopHoc);

      if (!res.success) {
        handleErrors(res);
        return;
      }

      const dsSinhVien = res.data;
      setDsSinhVien(dsSinhVien);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  }, []);

  const loadLopHoc = useCallback(async () => {
    try {
      const res = await api.lopHoc.getLopHoc(match.params.idLopHoc);

      if (!res.success) {
        handleErrors(res);
        return;
      }

      const lopHoc = res.data;
      setLopHoc(lopHoc);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const onCreated = (sinhVien: any) => {
    setDsSinhVien([sinhVien, ...dsSinhVien]);
    setShowAddSinhVien(false);
    notification['success']({
      message: 'Thành công',
      description: `Tạo sinh viên ${sinhVien.hoTen} thành công`,
    });
  };

  const onUpdated = (sinhVien: any) => {
    const sinhVienIndex = dsSinhVien.findIndex((tk) => tk.id === sinhVien.id);
    const dsSV = [...dsSinhVien];
    dsSV.splice(sinhVienIndex, 1, sinhVien);
    setDsSinhVien(dsSV);
    notification['success']({
      message: 'Thành công',
      description: `Cập nhật thông tin sinh viên ${sinhVien.hoTen} thành công`,
    });
  };

  const onDeleted = (sinhVien: any) => {
    const sinhVienIndex = dsSinhVien.findIndex((tk) => tk.id === sinhVien.id);
    const dsSV = [...dsSinhVien];
    dsSV.splice(sinhVienIndex, 1);
    setDsSinhVien(dsSV);
    notification['success']({
      message: 'Thành công',
      description: `Xoá sinh viên ${sinhVien.hoTen} thành công`,
    });
  };

  useEffect(() => {
    loadDsSinhVien();
  }, [loadDsSinhVien]);

  useEffect(() => {
    loadLopHoc();
  }, [loadLopHoc]);

  useEffect(() => {
    dispatch(actions.app.updateTitle('Quản lý sinh viên'));
  }, []);

  return (
    <Space direction="vertical" style={{ width: '100%' }} size="large">
      <Row>
        <Button
          type="link"
          icon={<ArrowLeftOutlined />}
          onClick={() => history.push(ROUTES.LOP_HOC)}
        >
          Quay lại
        </Button>
      </Row>
      <Row>
        {!!lopHoc && (
          <Typography.Title level={3}>Lớp: {lopHoc.tenLop}</Typography.Title>
        )}
      </Row>
      <Row justify="space-between">
        <Col span={12}>
          <Input.Search size="large" placeholder="Tìm kiếm sinh viên" />
        </Col>
        <Col span={12}>
          <Row justify="end">
            <Space>
              <Tooltip title="Tải lại">
                <Button
                  type="ghost"
                  icon={<ReloadOutlined />}
                  size="large"
                  onClick={() => loadDsSinhVien()}
                />
              </Tooltip>
              <Button
                type="primary"
                icon={<UserAddOutlined />}
                size="large"
                onClick={() => setShowAddSinhVien(true)}
              >
                Thêm sinh viên
              </Button>
            </Space>
          </Row>
        </Col>
      </Row>
      <Table
        columns={columns(onUpdated, onDeleted)}
        dataSource={dsSinhVien}
        loading={loading}
        bordered
      />
      {showAddSinhVien && (
        <AddSinhVienModal
          idLopHoc={match.params.idLopHoc}
          visible={showAddSinhVien}
          onCancel={setShowAddSinhVien}
          onCreated={onCreated}
        />
      )}
    </Space>
  );
}

export default PageSinhVien;
