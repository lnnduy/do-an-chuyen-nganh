import {
  Space,
  Row,
  Col,
  Input,
  Tooltip,
  Button,
  Table,
  notification,
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
import AddKhoCauHoiModal from './AddKhoCauHoiModal';
import ROUTES from '../../constants/routes';
import { useHistory } from 'react-router';

type Props = {
  match: any;
};

function PageKhoCauHoi({ match }: Props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showAddKhoCauHoi, setShowAddKhoCauHoi] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dsKhoCauHoi, setDsKhoCauHoi] = useState(new Array<any>());

  const loadDsKhoCauHoi = useCallback(async () => {
    setLoading(true);

    try {
      const res = await api.khoCauHoi.getDsKhoCauHoi(match.params.idHocPhan);

      if (!res.success) {
        handleErrors(res);
        return;
      }

      const dsKhoCauHoi = res.data;
      setDsKhoCauHoi(dsKhoCauHoi);
    } catch (error) {
      console.log(error);
      handleErrors(error);
    }

    setLoading(false);
  }, []);

  const onCreated = (khoCauHoi: any) => {
    setDsKhoCauHoi([khoCauHoi, ...dsKhoCauHoi]);
    setShowAddKhoCauHoi(false);
    notification['success']({
      message: 'Thành công',
      description: `Tạo kho câu hỏi ${khoCauHoi.tenKhoCauHoi} thành công`,
    });
  };

  const onUpdated = (khoCauHoi: any) => {
    const khoCauHoiIndex = dsKhoCauHoi.findIndex(
      (tk) => tk.id === khoCauHoi.id
    );
    const dsSV = [...dsKhoCauHoi];
    dsSV.splice(khoCauHoiIndex, 1, khoCauHoi);
    setDsKhoCauHoi(dsSV);
    notification['success']({
      message: 'Thành công',
      description: `Cập nhật thông tin kho câu hỏi ${khoCauHoi.tenKhoCauHoi} thành công`,
    });
  };

  const onDeleted = (khoCauHoi: any) => {
    const khoCauHoiIndex = dsKhoCauHoi.findIndex(
      (tk) => tk.id === khoCauHoi.id
    );
    const dsSV = [...dsKhoCauHoi];
    dsSV.splice(khoCauHoiIndex, 1);
    setDsKhoCauHoi(dsSV);
    notification['success']({
      message: 'Thành công',
      description: `Xoá kho câu hỏi ${khoCauHoi.tenKhoCauHoi} thành công`,
    });
  };

  useEffect(() => {
    loadDsKhoCauHoi();
  }, [loadDsKhoCauHoi]);

  useEffect(() => {
    dispatch(actions.app.updateTitle('Quản lý kho câu hỏi'));
  }, []);

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Row>
        <Button
          type="link"
          icon={<ArrowLeftOutlined />}
          onClick={() => history.push(ROUTES.LOP_HOC)}
        >
          Quay lại
        </Button>
      </Row>
      <Row justify="space-between">
        <Col span={12}>
          <Input.Search size="large" placeholder="Tìm kiếm kho câu hỏi" />
        </Col>
        <Col span={12}>
          <Row justify="end">
            <Space>
              <Tooltip title="Tải lại">
                <Button
                  type="ghost"
                  icon={<ReloadOutlined />}
                  size="large"
                  onClick={() => loadDsKhoCauHoi()}
                />
              </Tooltip>
              <Button
                type="primary"
                icon={<UserAddOutlined />}
                size="large"
                onClick={() => setShowAddKhoCauHoi(true)}
              >
                Thêm kho câu hỏi
              </Button>
            </Space>
          </Row>
        </Col>
      </Row>
      <Table
        columns={columns(onUpdated, onDeleted)}
        dataSource={dsKhoCauHoi}
        loading={loading}
        bordered
      />
      {showAddKhoCauHoi && (
        <AddKhoCauHoiModal
          idHocPhan={match.params.idHocPhan}
          visible={showAddKhoCauHoi}
          onCancel={setShowAddKhoCauHoi}
          onCreated={onCreated}
        />
      )}
    </Space>
  );
}

export default PageKhoCauHoi;
