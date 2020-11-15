import React, { useCallback, useEffect, useState } from 'react';
import {
  ArrowLeftOutlined,
  ReloadOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import { Space, Row, Button, Typography, Col, Input, Tooltip } from 'antd';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import ROUTES from '../../constants/routes';
import api from '../../api';
import handleErrors from '../../shared/handleErrors';
import actions from '../../store/actions';

type Props = {
  match: any;
};

function PageDeThi({ match }: Props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [hocPhan, setHocPhan] = useState<any>(null);
  const [showAddDeThi, setShowAddDeThi] = useState<boolean>(false);

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

  const loadDsDeThi = () => {};

  useEffect(() => {
    loadHocPhan();
  }, [loadHocPhan]);

  useEffect(() => {
    dispatch(actions.app.updateTitle('Quản lý đề thi'));
  }, []);

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
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
    </Space>
  );
}

export default PageDeThi;
