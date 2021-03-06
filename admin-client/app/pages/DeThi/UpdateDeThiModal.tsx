import {
  Alert,
  Input,
  Form,
  Modal,
  Row,
  Col,
  Typography,
  Card,
  Tooltip,
  Switch,
} from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import api from '../../api';
import handleErrors from '../../shared/handleErrors';
import { ArrowRightOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import DO_KHO_CAU_HOI from '../../constants/do-kho-cau-hoi';
import DoKhoCauHoi from '../../components/DoKhoCauHoi';

type Props = {
  idHocPhan: number;
  visible: boolean;
  onCancel: Function;
  onUpdated: Function;
  deThi: any;
};

function UpdateDeThiModal({
  visible,
  onCancel,
  onUpdated,
  idHocPhan,
  deThi,
}: Props) {
  const formRef = useRef<any>();
  const [failed, setFailed] = useState(false);
  const [errors, setErrors] = useState([]);
  const [dsKhoCauHoi, setDsKhoCauHoi] = useState<any[]>([]);
  const [selectedKhoCauHoi, setSelectedKhoCauHoi] = useState<any>(null);
  const [dsCauHoi, setDsCauHoi] = useState<any[]>([]);
  const [dsSelectedCauHoi, setDsSelectedCauHoi] = useState<any[]>([]);
  const [loadedKhoCauHoi, setLoadedKhoCauHoi] = useState(false);
  const [binded, setBinded] = useState(false);
  const [fields, setFields] = useState<any[]>([]);

  const capNhatDeThi = async (form?: any) => {
    if (form === undefined) {
      formRef.current?.submit();
      return;
    }
    try {
      const capNhatDeThiRequest = {
        ...form,
        dsIdCauHoi: dsSelectedCauHoi.map((ch) => ch.id),
      };
      const res = await api.deThi.capNhatDeThi(deThi.id, capNhatDeThiRequest);

      if (!res.success) {
        if (res.statusCode === 400) {
          setErrors(res.errors);
          setFailed(true);
        } else {
          handleErrors(res);
          setFailed(true);
        }
      }

      onUpdated(res.data);
      onCancel();
    } catch (error) {
      console.log(error);
      setFailed(true);
    }
  };

  const loadKhoCauHoi = async () => {
    setLoadedKhoCauHoi(false);
    try {
      const res = await api.khoCauHoi.getDsKhoCauHoi(idHocPhan);

      if (!res.success) {
        console.log(res.errors);
        handleErrors(res);
        return;
      }

      const dsKhoCauHoi = res.data.map((kch: any) => ({
        ...kch,
        soCauHoiDeDaChon: 0,
        soCauHoiTrungBinhDaChon: 0,
        soCauHoiKhoDaChon: 0,
      }));
      setDsKhoCauHoi(dsKhoCauHoi);
    } catch (error) {
      console.log(error);
    }
    setLoadedKhoCauHoi(true);
  };

  const loadCauHoi = async () => {
    try {
      const res = await api.cauHoi.getDsCauHoi(selectedKhoCauHoi?.id);

      if (!res.success) {
        console.log(res.errors);
        handleErrors(res);
        return;
      }

      const dsCauHoi = res.data.map((ch: any) => ({
        ...ch,
        selected: dsSelectedCauHoi.findIndex((q) => q.id === ch.id) !== -1,
      }));
      setDsCauHoi(dsCauHoi);
    } catch (error) {
      console.log(error);
    }
  };

  const selectCauHoi = (ch: any) => {
    const cauHoiIndex = dsCauHoi.findIndex((q) => q.id === ch.id);
    const cauHoi = { ...dsCauHoi[cauHoiIndex] };
    const khoCauHoiIndex = dsKhoCauHoi.findIndex(
      (kch) => kch.id === ch.idKhoCauHoi
    );
    const khoCauHoi = { ...dsKhoCauHoi[khoCauHoiIndex] };

    khoCauHoi.soCauHoiDeDaChon += cauHoi.doKho === DO_KHO_CAU_HOI.DE ? 1 : 0;
    khoCauHoi.soCauHoiTrungBinhDaChon +=
      cauHoi.doKho === DO_KHO_CAU_HOI.TRUNG_BINH ? 1 : 0;
    khoCauHoi.soCauHoiKhoDaChon += cauHoi.doKho === DO_KHO_CAU_HOI.KHO ? 1 : 0;

    cauHoi.selected = true;

    setDsKhoCauHoi([
      ...dsKhoCauHoi.slice(0, khoCauHoiIndex),
      khoCauHoi,
      ...dsKhoCauHoi.slice(khoCauHoiIndex + 1),
    ]);
    setDsCauHoi([
      ...dsCauHoi.slice(0, cauHoiIndex),
      cauHoi,
      ...dsCauHoi.slice(cauHoiIndex + 1),
    ]);
    setDsSelectedCauHoi([cauHoi, ...dsSelectedCauHoi]);
  };

  const unselectCauHoi = (ch: any) => {
    const selectedCauHoiIndex = dsSelectedCauHoi.findIndex(
      (q) => q.id === ch.id
    );
    setDsSelectedCauHoi([
      ...dsSelectedCauHoi.slice(0, selectedCauHoiIndex),
      ...dsSelectedCauHoi.slice(selectedCauHoiIndex + 1),
    ]);
    const khoCauHoiIndex = dsKhoCauHoi.findIndex(
      (kch) => kch.id === ch.idKhoCauHoi
    );
    const khoCauHoi = { ...dsKhoCauHoi[khoCauHoiIndex] };

    khoCauHoi.soCauHoiDeDaChon -= ch.doKho === DO_KHO_CAU_HOI.DE ? 1 : 0;
    khoCauHoi.soCauHoiTrungBinhDaChon -=
      ch.doKho === DO_KHO_CAU_HOI.TRUNG_BINH ? 1 : 0;
    khoCauHoi.soCauHoiKhoDaChon -= ch.doKho === DO_KHO_CAU_HOI.KHO ? 1 : 0;

    setDsKhoCauHoi([
      ...dsKhoCauHoi.slice(0, khoCauHoiIndex),
      khoCauHoi,
      ...dsKhoCauHoi.slice(khoCauHoiIndex + 1),
    ]);

    if (ch.idKhoCauHoi !== selectedKhoCauHoi.id) return;

    const cauHoiIndex = dsCauHoi.findIndex((q) => q.id === ch.id);
    const cauHoi = { ...dsCauHoi[cauHoiIndex] };

    cauHoi.selected = false;

    setDsCauHoi([
      ...dsCauHoi.slice(0, cauHoiIndex),
      cauHoi,
      ...dsCauHoi.slice(cauHoiIndex + 1),
    ]);
  };

  useEffect(() => {
    if (!loadedKhoCauHoi || binded) return;
    setDsSelectedCauHoi(deThi.dsCauHoi);
    setBinded(true);

    let dsKCH = [...dsKhoCauHoi].map((kch) => ({
      ...kch,
      soCauHoiDeDaChon: 0,
      soCauHoiTrungBinhDaChon: 0,
      soCauHoiKhoDaChon: 0,
    }));

    deThi.dsCauHoi.forEach((ch: any) => {
      const kchIndex = dsKCH.findIndex((kch) => kch.id === ch.idKhoCauHoi);
      const kch = { ...dsKCH[kchIndex] };

      kch.soCauHoiDeDaChon += ch.doKho === DO_KHO_CAU_HOI.DE ? 1 : 0;
      kch.soCauHoiTrungBinhDaChon +=
        ch.doKho === DO_KHO_CAU_HOI.TRUNG_BINH ? 1 : 0;
      kch.soCauHoiKhoDaChon += ch.doKho === DO_KHO_CAU_HOI.KHO ? 1 : 0;

      dsKCH = [...dsKCH.slice(0, kchIndex), kch, ...dsKCH.slice(kchIndex + 1)];
    });

    setDsKhoCauHoi([...dsKCH]);
  }, [deThi, loadedKhoCauHoi, binded]);

  useEffect(() => {
    setFields([
      {
        name: ['tenDeThi'],
        value: deThi.tenDeThi,
        touched: false,
        errors: [],
        validating: false,
      },
      {
        name: ['sanSang'],
        value: deThi.sanSang,
        touched: false,
        errors: [],
        validating: false,
      },
    ]);
  }, [deThi]);

  useEffect(() => {
    loadKhoCauHoi();
  }, []);

  useEffect(() => {
    selectedKhoCauHoi && loadCauHoi();
  }, [selectedKhoCauHoi]);

  return (
    <Modal
      style={{ paddingTop: 40 }}
      title="Cập nhật đề thi"
      visible={visible}
      okText="Cập nhật"
      cancelText="Huỷ"
      centered
      maskClosable={false}
      onCancel={() => onCancel()}
      onOk={() => capNhatDeThi()}
      width={1600}
    >
      {failed && errors.length > 0 && <Alert message={errors.join('\n')} />}
      <Row gutter={[20, 5]} style={{ minHeight: 700 }}>
        <Col xs={12} md={12} lg={6}>
          <Row
            gutter={[8, 0]}
            style={{
              maxHeight: 700,
              minHeight: 700,
              display: 'flex',
              flexDirection: 'column',
              flexWrap: 'nowrap',
            }}
          >
            <Col span={24}>
              <Form
                fields={fields}
                layout="vertical"
                onFinish={capNhatDeThi}
                ref={formRef}
              >
                <Form.Item
                  label="Tên đề thi"
                  name="tenDeThi"
                  rules={[{ required: true, message: 'Chưa nhập tên đề thi' }]}
                >
                  <Input
                    placeholder="Nhập tên đề thi"
                    allowClear
                    size="large"
                  />
                </Form.Item>
                <Form.Item
                  label="Sẵn sàng"
                  name="sanSang"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
              </Form>
            </Col>
            <Col span={24}>
              <Typography style={{ marginBottom: 8 }}>
                Danh sách kho câu hỏi
              </Typography>
            </Col>
            <Col
              span={24}
              style={{
                maxHeight: '100%',
                flex: 'auto',
                border: '1px solid #303030',
                padding: 8,
                overflow: 'auto',
              }}
            >
              <Row gutter={[0, 10]}>
                {dsKhoCauHoi.map((kch) => (
                  <Col key={kch.id} span={24}>
                    <Card hoverable onClick={() => setSelectedKhoCauHoi(kch)}>
                      <Typography.Title
                        level={4}
                        style={{ textAlign: 'center' }}
                      >
                        {kch.tenKhoCauHoi}
                      </Typography.Title>
                      <Typography
                        style={{ textAlign: 'center', color: '#a0a0a0' }}
                      >
                        Đã chọn:{' '}
                        {kch.soCauHoiDeDaChon +
                          kch.soCauHoiTrungBinhDaChon +
                          kch.soCauHoiKhoDaChon}{' '}
                        câu hỏi
                      </Typography>
                      <Row justify="space-around">
                        <Col>
                          <Row>
                            <Col>
                              <Typography style={{ textAlign: 'center' }}>
                                Dễ
                              </Typography>
                              <Typography
                                style={{
                                  textAlign: 'center',
                                  fontSize: 18,
                                  fontWeight: 700,
                                }}
                              >
                                {kch.soCauHoiDeDaChon}
                              </Typography>
                            </Col>
                          </Row>
                        </Col>
                        <Col>
                          <Row>
                            <Col>
                              <Typography style={{ textAlign: 'center' }}>
                                Trung bình
                              </Typography>
                              <Typography
                                style={{
                                  textAlign: 'center',
                                  fontSize: 18,
                                  fontWeight: 700,
                                }}
                              >
                                {kch.soCauHoiTrungBinhDaChon}
                              </Typography>
                            </Col>
                          </Row>
                        </Col>
                        <Col>
                          <Row>
                            <Col>
                              <Typography style={{ textAlign: 'center' }}>
                                Khó
                              </Typography>
                              <Typography
                                style={{
                                  textAlign: 'center',
                                  fontSize: 18,
                                  fontWeight: 700,
                                }}
                              >
                                {kch.soCauHoiKhoDaChon}
                              </Typography>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </Col>
        <Col xs={12} md={12} lg={9}>
          <Row
            gutter={[8, 0]}
            style={{
              maxHeight: 700,
              minHeight: 700,
              display: 'flex',
              flexDirection: 'column',
              flexWrap: 'nowrap',
            }}
          >
            <Col span={24}>
              <Typography style={{ marginBottom: 8 }}>
                Danh sách câu hỏi
              </Typography>
            </Col>
            <Col
              span={24}
              style={{
                height: '100%',
                overflow: 'auto',
                flex: 'auto',
                border: '1px solid #303030',
                padding: 8,
              }}
            >
              <Row gutter={[10, 10]}>
                {dsCauHoi.map(
                  (ch) =>
                    !ch.selected && (
                      <Col span={12}>
                        <Card
                          className="card-cau-hoi"
                          actions={[
                            <Tooltip title="Chọn câu hỏi">
                              <ArrowRightOutlined
                                onClick={() => selectCauHoi(ch)}
                              />
                            </Tooltip>,
                          ]}
                        >
                          <DoKhoCauHoi doKho={ch.doKho} />
                          <Typography>{ch.noiDung}</Typography>
                        </Card>
                      </Col>
                    )
                )}
              </Row>
            </Col>
          </Row>
        </Col>
        <Col xs={12} md={12} lg={9}>
          <Row
            gutter={[8, 0]}
            style={{
              maxHeight: 700,
              minHeight: 700,
              display: 'flex',
              flexDirection: 'column',
              flexWrap: 'nowrap',
            }}
          >
            <Col span={24}>
              <Typography style={{ marginBottom: 8 }}>
                Danh sách câu hỏi đã chọn
              </Typography>
            </Col>
            <Col
              span={24}
              style={{
                height: '100%',
                overflow: 'auto',
                flex: 'auto',
                border: '1px solid #303030',
                padding: 8,
              }}
            >
              <Row gutter={[10, 10]}>
                {dsSelectedCauHoi.map((ch) => (
                  <Col span={12}>
                    <Card
                      className="card-cau-hoi"
                      actions={[
                        <Tooltip title="Bỏ chọn câu hỏi">
                          <ArrowLeftOutlined
                            onClick={() => unselectCauHoi(ch)}
                          />
                        </Tooltip>,
                      ]}
                    >
                      <DoKhoCauHoi doKho={ch.doKho} />
                      <Typography>{ch.noiDung}</Typography>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Modal>
  );
}

export default UpdateDeThiModal;
