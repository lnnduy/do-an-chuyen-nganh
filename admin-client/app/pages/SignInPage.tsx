import {
  Alert,
  Button,
  Card,
  Col,
  Divider,
  Form,
  Image,
  Input,
  Row,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import actions from '../store/actions';
import fallImage from '../constants/fall-image';
import api from '../api';
import { useHistory } from 'react-router-dom';

function SignInPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState<null | string[]>(null);

  useEffect(() => {
    dispatch(actions.app.updateTitle('Đăng nhập'));
  }, []);

  const signIn = async (form: any) => {
    const { username, matKhau } = form;

    try {
      setSending(true);
      setFailed(false);
      setErrorMessage(null);
      const data = await api.auth.signIn(username, matKhau);

      if (!data.success) {
        setFailed(true);
        setErrorMessage(data.errors);
      }

      const { token, ...user } = data.data;
      localStorage.setItem('token', token);
      dispatch(actions.auth.setAuth(token));
      dispatch(actions.auth.setUser(user));
      setSending(false);

      history.push('/');
    } catch (error) {
      console.log(error);
      setSending(false);
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
          {failed && (
            <Alert
              className="custom-antd-alert"
              type="error"
              message={errorMessage?.join('\n')}
              closable
              style={{ marginBottom: '12px' }}
            />
          )}
          <Form layout="vertical" onFinish={signIn}>
            <Form.Item
              label="Tài khoản"
              name="username"
              className="custom-antd-form-item"
              rules={[{ required: true, message: 'Chưa nhập thông tin' }]}
            >
              <Input
                size="large"
                allowClear
                bordered={false}
                style={{ backgroundColor: '#333333', color: '#fff' }}
                className="custom-antd-input"
              />
            </Form.Item>
            <Form.Item
              label="Mật khẩu"
              name="matKhau"
              className="custom-antd-form-item"
              rules={[{ required: true, message: 'Chưa nhập thông tin' }]}
            >
              <Input.Password
                size="large"
                type="password"
                allowClear
                visibilityToggle
                bordered={false}
                className="custom-antd-input"
                style={{ backgroundColor: '#333333', color: '#fff' }}
              />
            </Form.Item>
            <Divider />
            <Form.Item>
              <Button
                htmlType="submit"
                block
                type="primary"
                size="large"
                disabled={sending}
              >
                Đăng nhập
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}

export default SignInPage;
