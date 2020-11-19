import { Col, Modal, Row } from 'antd';
import React from 'react';
import CardCauHoi from '../../components/CardCauHoi';

type Props = {
  visible: boolean;
  deThi: any;
  onClose: Function;
};

function XemChiTietModal({ visible, deThi, onClose }: Props) {
  return (
    <Modal
      style={{ paddingTop: 40 }}
      footer={null}
      maskClosable={false}
      width={1600}
      visible={visible}
      title={deThi.tenDeThi}
      onCancel={() => onClose(false)}
    >
      <Row
        gutter={[10, 10]}
        style={{ minHeight: 700, maxHeight: 700, overflow: 'auto' }}
      >
        {deThi.dsCauHoi.map((ch: any) => (
          <Col span={12}>
            <CardCauHoi cauHoi={ch} actions={false} />
          </Col>
        ))}
      </Row>
    </Modal>
  );
}

export default XemChiTietModal;
