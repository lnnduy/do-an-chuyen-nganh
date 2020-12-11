import {
  Button,
  Col,
  Popconfirm,
  Row,
  Space,
  Table,
  Tooltip,
  Typography,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import api from '../../api';
import handleErrors from '../../shared/handleErrors';
import actions from '../../store/actions';
import { KeyOutlined } from '@ant-design/icons';
import TRANG_THAI_CA_THI from '../../constants/trang-thai-ca-thi';

type Props = {
  match: any;
};

function PageDieuKhienCaThi({ match }: Props) {
  const dispatch = useDispatch();
  const [caThi, setCaThi] = useState<any>(null);
  const [dsThiSinh, setDsThiSinh] = useState<any[]>([]);

  const loadCaThi = async () => {
    try {
      const { idCaThi } = match.params;
      const res = await api.caThi.getCaThi(idCaThi);

      if (!res.success) {
        console.log(res.errors);
        handleErrors(res);
        return;
      }

      setCaThi(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadMaBaoVeCaThi = async () => {
    try {
      const { idCaThi } = match.params;
      const res = await api.caThi.getMaBaoVeCaThi(idCaThi);

      if (!res.success) {
        console.log(res.errors);
        handleErrors(res);
        return;
      }

      setCaThi(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadThiSinh = async () => {
    try {
      const { idCaThi } = match.params;
      const res = await api.caThi.getDsThiSinhDaThamGia(idCaThi);

      if (!res.success) {
        console.log(res.errors);
        handleErrors(res);
        return;
      }

      setDsThiSinh(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const batDauCaThi = async () => {
    try {
      const { idCaThi } = match.params;
      const res = await api.caThi.batDauCaThi(idCaThi, Date.now());

      if (!res.success) {
        console.log(res.errors);
        handleErrors(res);
        return;
      }

      setCaThi(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const ketThucCaThi = async () => {
    try {
      const { idCaThi } = match.params;
      const res = await api.caThi.ketThucCaThi(idCaThi);

      if (!res.success) {
        console.log(res.errors);
        handleErrors(res);
        return;
      }

      setCaThi(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadCaThi();
    loadThiSinh();
  }, []);

  useEffect(() => {
    if (caThi === null) return;
    dispatch(actions.app.updateTitle(caThi.tenCaThi));
  }, [caThi]);

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Row>
        <Col span={24}>
          <Row justify="center" style={{ marginBottom: 15 }}>
            <Space>
              <Typography.Title level={3} style={{ margin: 0 }}>
                {caThi?.maBaoVe || <i>Chưa lấy mã</i>}
              </Typography.Title>
              <Tooltip title="Lấy mã bảo vệ">
                <Button
                  shape="circle"
                  icon={<KeyOutlined />}
                  size="large"
                  onClick={() => loadMaBaoVeCaThi()}
                ></Button>
              </Tooltip>
            </Space>
          </Row>
          {caThi?.trangThai === TRANG_THAI_CA_THI.CHUA_BAT_DAU && (
            <Row justify="center">
              <Col span={6}>
                <Button
                  block
                  size="large"
                  type="primary"
                  onClick={() => batDauCaThi()}
                >
                  Bắt đầu
                </Button>
              </Col>
            </Row>
          )}
          {caThi?.trangThai === TRANG_THAI_CA_THI.DA_BAT_DAU && (
            <Row justify="center">
              <Col span={6}>
                <Popconfirm
                  title="Kết thúc ca thi?"
                  onConfirm={() => ketThucCaThi()}
                >
                  <Button block size="large" type="primary">
                    Kết thúc
                  </Button>
                </Popconfirm>
              </Col>
            </Row>
          )}
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Row justify="space-between">
            <Typography.Title level={4}>
              Danh sách thí sinh đã tham gia
            </Typography.Title>
            <Button onClick={() => loadThiSinh()}>Tải lại</Button>
          </Row>
        </Col>
        <Table
          bordered
          columns={[
            { title: 'Id', dataIndex: 'id' },
            { title: 'MSSV', dataIndex: 'mssv' },
            { title: 'Họ tên', dataIndex: 'hoTen' },
            { title: 'Số lần đăng nhập', dataIndex: 'soLanDangNhap' },
            { title: 'Tên máy hiện tại', dataIndex: 'tenMay' },
            { title: 'Địa chỉ ip', dataIndex: 'diaChiIp' },
            { title: 'Trạng thái', dataIndex: 'trangThaiThi' },
          ]}
          dataSource={dsThiSinh}
          style={{ width: '100%' }}
        />
      </Row>
    </Space>
  );
}

export default PageDieuKhienCaThi;
