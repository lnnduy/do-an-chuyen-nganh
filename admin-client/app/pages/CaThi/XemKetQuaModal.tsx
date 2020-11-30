import { Card, Col, Modal, Row, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import api from '../../api';
import handleErrors from '../../shared/handleErrors';

type Props = {
  visible: boolean;
  idCaThi: number;
  onCancel: Function;
};

function XemKetQuaModal({ visible, idCaThi, onCancel }: Props) {
  const [ketQua, setKetQua] = useState<any>(null);

  const loadKetQua = async () => {
    try {
      const res = await api.ketQua.getKetQuaCaThi(idCaThi);

      if (!res.success) {
        console.log(res.errors);
        handleErrors(res);
        return;
      }

      setKetQua(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadKetQua();
  }, []);

  return (
    <Modal
      visible={visible}
      onCancel={() => onCancel(false)}
      title="Kết quả"
      width={1000}
      style={{ paddingTop: 45 }}
    >
      {ketQua !== null && (
        <>
          <Row>
            <Col span={24}>
              <Typography.Title level={3}>
                Tên đề thi: {ketQua.tenDeThi}
              </Typography.Title>
            </Col>
            <Col span={24}>
              <Typography.Title level={3}>
                Số câu hỏi: {ketQua.soCauHoi}
              </Typography.Title>
            </Col>
          </Row>
          <Row
            gutter={[10, 10]}
            style={{
              width: '100%',
              minHeight: 600,
              maxHeight: 600,
              overflow: 'auto',
              padding: '10px 0',
            }}
          >
            {ketQua.dsKetQuaCaNhan.map((kqcn: any, i: number) => (
              <Col key={i} span={8}>
                <Card>
                  <Typography>Mã sinh viên: {kqcn.mssv}</Typography>
                  <Typography>Họ tên: {kqcn.hoTen}</Typography>
                  <Typography>Số câu đúng: {kqcn.soCauTraLoiDung}</Typography>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )}
    </Modal>
  );
}

export default XemKetQuaModal;
