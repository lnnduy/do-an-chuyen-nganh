import { Button, Card, Col, Divider, Form, Image, Input, Row } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import actions from '../../store/actions';
import fallImage from '../../constants/fall-image';
import api from '../../api';
import { useHistory } from 'react-router-dom';
import ROUTES from '../../constants/routes';
import handleErrors from '../../shared/handleErrors';

function ThiSinhSignInPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(actions.app.updateTitle('Đăng nhập'));
  }, []);

  const signIn = async (form: any) => {
    const { mssv } = form;

    try {
      const res = await api.sinhVien.getSinhVienByMssv(mssv);

      if (!res.success) {
        console.log(res.errors);
        handleErrors(res);
        return;
      }

      const idSinhVien = res.data.id;
      localStorage.setItem('idSinhVien', idSinhVien);
      history.push('/thi-sinh');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Row
      align="middle"
      justify="center"
      style={{
        backgroundColor: '#333333',
        minHeight: 'calc(100vh - 30px)',
      }}
    >
      <Col lg={8} md={16} xs={24}>
        <Card style={{ backgroundColor: '#121212' }} bordered={false}>
          <Row justify="center">
            <Image
              src="./assets/images/logo.png"
              width={80}
              height={80}
              fallback={fallImage}
            />
          </Row>
          <Divider />
          <Form layout="vertical" onFinish={signIn}>
            <Form.Item
              label="Mã số sinh viên"
              name="mssv"
              className="custom-antd-form-item"
              rules={[{ required: true, message: 'Chưa nhập mã số sinh viên' }]}
            >
              <Input
                size="large"
                allowClear
                bordered={false}
                style={{ backgroundColor: '#333333', color: '#fff' }}
                className="custom-antd-input"
                placeholder="Nhập mã số sinh viên"
              />
            </Form.Item>
            <Divider />
            <Form.Item>
              <Button htmlType="submit" block type="primary" size="large">
                Tiếp tục
              </Button>
            </Form.Item>
          </Form>
          <Button
            block
            size="large"
            onClick={() => history.push(ROUTES.DANG_NHAP)}
          >
            Dành cho quản lý
          </Button>
        </Card>
      </Col>
    </Row>
  );
}

export default ThiSinhSignInPage;
