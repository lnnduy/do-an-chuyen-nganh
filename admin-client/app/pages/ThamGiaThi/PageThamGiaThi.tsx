import { Card, Col, Form, Input, Modal, Row, Typography } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import api from '../../api';
import getDiaChiIp from '../../shared/getDiaChiIp';
import getTenMay from '../../shared/getTenMay';
import handleErrors from '../../shared/handleErrors';

function PageThamGiaThi() {
  const formRef = useRef<any>(null);
  const history = useHistory();
  const [dsCaThi, setDsCaThi] = useState<any[]>([]);
  const [selectedCaThi, setSelectedCaThi] = useState<any>(null);

  const loadCaThi = async () => {
    try {
      const res = await api.publicCaThi.getDsCaThi();

      if (!res.success) {
        console.log(res.errors);
        handleErrors(res);
        return;
      }

      setDsCaThi(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const join = async (form?: any) => {
    if (form === undefined) {
      formRef.current.submit();
      return;
    }

    try {
      const res = await api.publicCaThi.thamGiaCaThi(selectedCaThi.id, {
        ...form,
        tenMay: getTenMay(),
        diaChiIp: getDiaChiIp(),
      });

      if (!res.success) {
        console.log(res.errors);
        handleErrors(res);
        return;
      }

      localStorage.setItem('caThi', JSON.stringify(res.data));
      history.push('thi-sinh/thi-trac-nghiem');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadCaThi();
  }, []);

  return (
    <div
      style={{
        padding: 15,
        maxHeight: 'calc(100vh - 30px)',
        minHeight: 'calc(100vh - 30px)',
        overflow: 'auto',
        backgroundColor: '#303030',
      }}
    >
      <Row gutter={[10, 10]}>
        {dsCaThi.map((ct) => (
          <Col span={6}>
            <Card hoverable onClick={() => setSelectedCaThi(ct)}>
              <Typography.Title level={5}>{ct.tenCaThi}</Typography.Title>
              <Typography.Text>{ct.trangThai}</Typography.Text>
            </Card>
          </Col>
        ))}
      </Row>
      {selectedCaThi !== null && (
        <Modal
          visible={selectedCaThi !== null}
          centered
          okText="Vào"
          onCancel={() => setSelectedCaThi(null)}
          onOk={() => join()}
        >
          <Form layout="vertical" ref={formRef} onFinish={join}>
            <Form.Item
              label="Mã bảo vệ"
              name="maBaoVe"
              rules={[{ required: true, message: 'Chưa nhập mã bảo vệ' }]}
            >
              <Input
                placeholder="Nhập mã bảo vệ do giám thị cung cấp"
                allowClear
              />
            </Form.Item>
          </Form>
        </Modal>
      )}
    </div>
  );
}

export default PageThamGiaThi;
