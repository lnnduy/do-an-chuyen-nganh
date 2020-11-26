import { Card, Col, Row, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import api from '../../api';
import ROUTES from '../../constants/routes';
import handleErrors from '../../shared/handleErrors';

function PageThi() {
  const history = useHistory();
  const [dsCaThi, setDsCaThi] = useState<any[]>([]);

  const loadCaThiDaNhan = async () => {
    try {
      const res = await api.caThi.getDsCaThiDaNhan();

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

  useEffect(() => {
    loadCaThiDaNhan();
  }, []);

  return (
    <Row gutter={[10, 10]}>
      {dsCaThi.map((ct) => (
        <Col span={6}>
          <Card
            hoverable
            onClick={() => history.push(ROUTES.THI + `/${ct.id}`)}
          >
            <Typography.Title level={5}>{ct.tenCaThi}</Typography.Title>
            <Typography.Text>{ct.trangThai}</Typography.Text>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default PageThi;
