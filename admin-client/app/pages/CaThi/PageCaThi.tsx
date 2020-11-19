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
  PlusOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons';
import React, { useCallback, useEffect, useState } from 'react';
import columns from './columns';
import { useDispatch } from 'react-redux';
import api from '../../api';
import handleErrors from '../../shared/handleErrors';
import actions from '../../store/actions';
import AddCaThiModal from './AddCaThiModal';
import ROUTES from '../../constants/routes';
import { useHistory } from 'react-router';

type Props = {
  match: any;
};

function PageCaThi({ match }: Props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showAddCaThi, setShowAddCaThi] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dsCaThi, setDsCaThi] = useState(new Array<any>());
  const [hocPhan, setHocPhan] = useState<any>(null);

  const loadDsCaThi = useCallback(async () => {
    setLoading(true);

    try {
      const res = await api.caThi.getDsCaThi(match.params.idHocPhan);

      if (!res.success) {
        handleErrors(res);
        return;
      }

      const dsCaThi = res.data;
      setDsCaThi(dsCaThi);
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

  const onCreated = (caThi: any) => {
    setDsCaThi([caThi, ...dsCaThi]);
    setShowAddCaThi(false);
    notification['success']({
      message: 'Thành công',
      description: `Tạo ca thi ${caThi.tenCaThi} thành công`,
    });
  };

  const onUpdated = (caThi: any) => {
    const caThiIndex = dsCaThi.findIndex((tk) => tk.id === caThi.id);
    const dsSV = [...dsCaThi];
    dsSV.splice(caThiIndex, 1, caThi);
    setDsCaThi(dsSV);
    notification['success']({
      message: 'Thành công',
      description: `Cập nhật thông tin ca thi ${caThi.tenCaThi} thành công`,
    });
  };

  const onDeleted = (caThi: any) => {
    const caThiIndex = dsCaThi.findIndex((tk) => tk.id === caThi.id);
    const dsSV = [...dsCaThi];
    dsSV.splice(caThiIndex, 1);
    setDsCaThi(dsSV);
    notification['success']({
      message: 'Thành công',
      description: `Xoá ca thi ${caThi.tenCaThi} thành công`,
    });
  };

  useEffect(() => {
    loadDsCaThi();
  }, [loadDsCaThi]);

  useEffect(() => {
    loadHocPhan();
  }, [loadHocPhan]);

  useEffect(() => {
    dispatch(actions.app.updateTitle('Quản lý ca thi'));
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
          <Input.Search size="large" placeholder="Tìm kiếm ca thi" />
        </Col>
        <Col span={12}>
          <Row justify="end">
            <Space>
              <Tooltip title="Tải lại">
                <Button
                  type="ghost"
                  icon={<ReloadOutlined />}
                  size="large"
                  onClick={() => loadDsCaThi()}
                />
              </Tooltip>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                size="large"
                onClick={() => setShowAddCaThi(true)}
              >
                Thêm ca thi
              </Button>
            </Space>
          </Row>
        </Col>
      </Row>
      <Table
        columns={columns(onUpdated, onDeleted)}
        dataSource={dsCaThi}
        loading={loading}
        bordered
      />
      {showAddCaThi && (
        <AddCaThiModal
          idHocPhan={match.params.idHocPhan}
          visible={showAddCaThi}
          onCancel={setShowAddCaThi}
          onCreated={onCreated}
        />
      )}
    </Space>
  );
}

export default PageCaThi;
