import {
  Button,
  Card,
  Col,
  Input,
  notification,
  Row,
  Space,
  Tooltip,
  Typography,
} from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import {
  ArrowLeftOutlined,
  ReloadOutlined,
  FileAddOutlined,
} from '@ant-design/icons';
import ROUTES from '../../constants/routes';
import api from '../../api';
import handleErrors from '../../shared/handleErrors';
import CardCauHoi from '../../components/CardCauHoi';
import AddCauHoiModal from './AddCauHoiModal';

type Props = {
  match: any;
};

function PageCauHoi({ match }: Props) {
  const history = useHistory();
  const [khoCauHoi, setKhoCauHoi] = useState<any>(null);
  const [dsCauHoi, setDsCauHoi] = useState<any>([]);
  const [showAddCauHoi, setShowAddCauHoi] = useState(false);

  const loadKhoCauHoi = useCallback(async () => {
    const res = await api.khoCauHoi.getKhoCauHoi(+match.params.idKhoCauHoi);

    if (!res.success) {
      console.log(res.errors);
      handleErrors(res);
      return;
    }

    const khoCauHoi = res.data;
    setKhoCauHoi(khoCauHoi);
  }, []);

  useEffect(() => {
    loadKhoCauHoi();
  }, [loadKhoCauHoi]);

  const loadDsCauHoi = useCallback(async () => {
    const res = await api.cauHoi.getDsCauHoi(+match.params.idKhoCauHoi);

    if (!res.success) {
      console.log(res.errors);
      handleErrors(res);
      return;
    }

    const dsCauHoi = res.data;
    setDsCauHoi(dsCauHoi);
  }, []);

  const onCreated = (cauHoi: any) => {
    setDsCauHoi([cauHoi, ...dsCauHoi]);
    setShowAddCauHoi(false);
    notification.success({
      message: 'Thành công',
      description: `Xoá sinh viên ${cauHoi.noiDung} thành công`,
    });
  };

  useEffect(() => {
    loadKhoCauHoi();
  }, [loadKhoCauHoi]);

  useEffect(() => {
    loadDsCauHoi();
  }, [loadDsCauHoi]);

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Row>
        <Button
          type="link"
          icon={<ArrowLeftOutlined />}
          onClick={() =>
            history.push(
              `${ROUTES.HOC_PHAN}/${match.params.idHocPhan}/kho-cau-hoi`
            )
          }
        >
          Quay lại
        </Button>
      </Row>
      <Row>
        {!!khoCauHoi && (
          <Typography.Title level={3}>
            Kho câu hỏi: {khoCauHoi.tenKhoCauHoi}
          </Typography.Title>
        )}
      </Row>
      <Row justify="space-between">
        <Col span={12}>
          <Input.Search size="large" placeholder="Tìm kiếm câu hỏi" />
        </Col>
        <Col span={12}>
          <Row justify="end">
            <Space>
              <Tooltip title="Tải lại">
                <Button
                  type="ghost"
                  icon={<ReloadOutlined />}
                  size="large"
                  onClick={() => loadDsCauHoi()}
                />
              </Tooltip>
              <Button
                type="primary"
                icon={<FileAddOutlined />}
                size="large"
                onClick={() => setShowAddCauHoi(true)}
              >
                Thêm câu hỏi
              </Button>
            </Space>
          </Row>
        </Col>
      </Row>
      <Row gutter={[10, 10]}>
        {dsCauHoi.map((cauHoi: any) => (
          <Col key={cauHoi.id} span={8}>
            <CardCauHoi cauHoi={cauHoi} />
          </Col>
        ))}
      </Row>
      {showAddCauHoi && (
        <AddCauHoiModal
          visible={showAddCauHoi}
          onCancel={() => setShowAddCauHoi(false)}
          idKhoCauHoi={match.params.idKhoCauHoi}
          onCreated={onCreated}
        />
      )}
    </Space>
  );
}

export default PageCauHoi;
