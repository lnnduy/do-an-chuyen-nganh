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
import AddDeThiModal from './AddDeThiModal';
import ROUTES from '../../constants/routes';
import { useHistory } from 'react-router';

type Props = {
  match: any;
};

function PageDeThi({ match }: Props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showAddDeThi, setShowAddDeThi] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dsDeThi, setDsDeThi] = useState(new Array<any>());
  const [hocPhan, setHocPhan] = useState<any>(null);

  const loadDsDeThi = useCallback(async () => {
    setLoading(true);

    try {
      const res = await api.deThi.getDsDeThi(match.params.idHocPhan);

      if (!res.success) {
        handleErrors(res);
        return;
      }

      const dsDeThi = res.data;
      setDsDeThi(dsDeThi);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  }, []);

  const loadHocPhan = useCallback(async () => {
    try {
      const res = await api.hocPhan.getHocPhan(match.params.idHocPhan);

      if (!res.success) {
        handleErrors(res);
        return;
      }

      const hocPhan = res.data;
      setHocPhan(hocPhan);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const onCreated = (deThi: any) => {
    setDsDeThi([deThi, ...dsDeThi]);
    setShowAddDeThi(false);
    notification['success']({
      message: 'Thành công',
      description: `Tạo đề thi ${deThi.tenDeThi} thành công`,
    });
  };

  const onUpdated = (deThi: any) => {
    const deThiIndex = dsDeThi.findIndex((tk) => tk.id === deThi.id);
    const dsSV = [...dsDeThi];
    dsSV.splice(deThiIndex, 1, deThi);
    setDsDeThi(dsSV);
    notification['success']({
      message: 'Thành công',
      description: `Cập nhật thông tin đề thi ${deThi.tenDeThi} thành công`,
    });
  };

  const onDeleted = (deThi: any) => {
    const deThiIndex = dsDeThi.findIndex((tk) => tk.id === deThi.id);
    const dsSV = [...dsDeThi];
    dsSV.splice(deThiIndex, 1);
    setDsDeThi(dsSV);
    notification['success']({
      message: 'Thành công',
      description: `Xoá đề thi ${deThi.tenDeThi} thành công`,
    });
  };

  useEffect(() => {
    loadDsDeThi();
  }, [loadDsDeThi]);

  useEffect(() => {
    loadHocPhan();
  }, [loadHocPhan]);

  useEffect(() => {
    dispatch(actions.app.updateTitle('Quản lý đề thi'));
  }, []);

  return (
    <Space direction="vertical" style={{ width: '100%' }} size="large">
      <Row>
        <Button
          type="link"
          icon={<ArrowLeftOutlined />}
          onClick={() => history.push(ROUTES.HOC_PHAN)}
        >
          Quay lại
        </Button>
      </Row>
      <Row>
        {!!hocPhan && (
          <Typography.Title level={3}>
            Học phần: {hocPhan.tenHocPhan}
          </Typography.Title>
        )}
      </Row>
      <Row justify="space-between">
        <Col span={12}>
          <Input.Search size="large" placeholder="Tìm kiếm đề thi" />
        </Col>
        <Col span={12}>
          <Row justify="end">
            <Space>
              <Tooltip title="Tải lại">
                <Button
                  type="ghost"
                  icon={<ReloadOutlined />}
                  size="large"
                  onClick={() => loadDsDeThi()}
                />
              </Tooltip>
              <Button
                type="primary"
                icon={<UserAddOutlined />}
                size="large"
                onClick={() => setShowAddDeThi(true)}
              >
                Thêm đề thi
              </Button>
            </Space>
          </Row>
        </Col>
      </Row>
      <Table
        columns={columns(onUpdated, onDeleted)}
        dataSource={dsDeThi}
        loading={loading}
        bordered
      />
      {showAddDeThi && (
        <AddDeThiModal
          idHocPhan={match.params.idHocPhan}
          visible={showAddDeThi}
          onCancel={setShowAddDeThi}
          onCreated={onCreated}
        />
      )}
    </Space>
  );
}

export default PageDeThi;
