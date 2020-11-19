import {
  Card,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Modal,
  Row,
  Tooltip,
  Typography,
} from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import api from '../../api';
import handleErrors from '../../shared/handleErrors';
import { QuestionCircleOutlined } from '@ant-design/icons';
import datetimeStringToUnix from '../../shared/dateStringToUnix';
import unixToDateString from '../../shared/unixToDateString';
import moment from 'moment';

type Props = {
  visible: boolean;
  onCancel: Function;
  caThi: any;
  idHocPhan: number;
  onUpdated: Function;
};

function UpdateCaThiModal({
  visible,
  onCancel,
  idHocPhan,
  onUpdated,
  caThi,
}: Props) {
  const formRef = useRef<any>(null);
  const [dsLopHoc, setDsLopHoc] = useState<any[]>([]);
  const [dsDeThi, setDsDeThi] = useState<any[]>([]);
  const [dsGiamThi, setDsGiamThi] = useState<any[]>([]);
  const [selectedLopHoc, setSelectedLopHoc] = useState<any>(null);
  const [selectedDeThi, setSelectedDeThi] = useState<any>(null);
  const [selectedGiamThi, setSelectedGiamThi] = useState<any>(null);
  const [selectingLopHoc, setSelectingLopHoc] = useState<boolean>(false);
  const [selectingDeThi, setSelectingDeThi] = useState<boolean>(false);
  const [selectingGiamThi, setSelectingGiamThi] = useState<boolean>(false);
  const [fields, setFields] = useState<any[]>([]);

  const capNhatCaThi = async (form?: any) => {
    if (form === undefined) {
      formRef.current.submit();
      return;
    }

    const capNhatCaThiRequest = {
      ...form,
      thoiGianBatDau: datetimeStringToUnix(
        form.thoiGianBatDau.format('HH:mm DD/MM/YYYY')
      ),
      thoiGianThi: form.thoiGianThi * 60000,
      idLopHoc: selectedLopHoc?.id,
      idDeThi: selectedDeThi?.id,
      idGiamThi: selectedGiamThi?.id,
    };

    try {
      const res = await api.caThi.capNhatCaThi(caThi.id, capNhatCaThiRequest);

      if (!res.success) {
        handleErrors(res);
        console.log(res.errors);
        return;
      }

      onUpdated(res.data);
      onCancel(false);
    } catch (error) {
      console.log(error);
    }
  };

  const loadDsLopHoc = async () => {
    try {
      const res = await api.lopHoc.getDsLopHoc();

      if (!res.success) {
        console.log(res.errors);
        handleErrors(res);
        return;
      }

      setDsLopHoc(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadDsDeThi = async () => {
    try {
      const res = await api.deThi.getDsDeThi(idHocPhan);

      if (!res.success) {
        console.log(res.errors);
        handleErrors(res);
        return;
      }

      setDsDeThi(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadDsGiamThi = async () => {
    try {
      const res = await api.taiKhoan.getDsTaiKhoan();

      if (!res.success) {
        console.log(res.errors);
        handleErrors(res);
        return;
      }

      setDsGiamThi(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadDsLopHoc();
    loadDsDeThi();
    loadDsGiamThi();
  }, []);

  useEffect(() => {
    setFields([
      {
        name: ['tenCaThi'],
        value: caThi.tenCaThi,
        touched: false,
        errors: [],
        validating: false,
      },
      {
        name: ['thoiGianBatDau'],
        value: moment(caThi.tenCaThi, 'HH:mm DD/MM/YYYY'),
        touched: false,
        errors: [],
        validating: false,
      },
      {
        name: ['thoiGianThi'],
        value: Math.floor(caThi.thoiGianThi / 60) / 1000,
        touched: false,
        errors: [],
        validating: false,
      },
    ]);
  }, [caThi]);

  useEffect(() => {
    const lopHocIndex = dsLopHoc.findIndex((lh) => lh.id === caThi.lopHoc.id);
    const lopHoc = dsLopHoc[lopHocIndex];
    setSelectedLopHoc(lopHoc);
  }, [caThi, dsLopHoc]);

  useEffect(() => {
    const deThiIndex = dsDeThi.findIndex((dt) => dt.id === caThi.deThi.id);
    const deThi = dsDeThi[deThiIndex];
    setSelectedDeThi(deThi);
  }, [caThi, dsDeThi]);

  useEffect(() => {
    const giamThiIndex = dsGiamThi.findIndex(
      (gt) => gt.id === caThi.giamThi.id
    );
    const giamThi = dsGiamThi[giamThiIndex];
    setSelectedGiamThi(giamThi);
  }, [caThi, dsGiamThi]);

  return (
    <Modal
      style={{ paddingTop: 40, minHeight: 700 }}
      visible={visible}
      title="Cập nhật ca thi"
      okText="Cập nhật"
      cancelText="Huỷ"
      width={1000}
      maskClosable={false}
      centered
      onCancel={() => onCancel(false)}
      onOk={() => capNhatCaThi()}
    >
      <Row gutter={[20, 5]}>
        <Col span={24}>
          <Form
            layout="vertical"
            ref={formRef}
            onFinish={capNhatCaThi}
            fields={fields}
          >
            <Form.Item
              label="Tên ca thi"
              name="tenCaThi"
              rules={[{ required: true, message: 'Chưa nhập tên ca thi' }]}
            >
              <Input placeholder="Nhập tên ca thi" allowClear size="large" />
            </Form.Item>
            <Form.Item
              label={
                <span>
                  Thời gian bắt đầu{' '}
                  <Tooltip
                    title={
                      <>
                        <span>
                          Dùng công cụ để chọn thời gian bắt đầu hoặc nhập thủ
                          công theo định dạng sau:
                        </span>
                        <Card>
                          <b>mm:HH DD/MM/YYY</b>
                          <Divider />
                          <i>
                            m: phút <br />
                            H: giờ <br />
                            D: ngày <br />
                            M: giờ <br />
                            Y: năm
                          </i>
                        </Card>
                      </>
                    }
                  >
                    <QuestionCircleOutlined />
                  </Tooltip>
                </span>
              }
              name="thoiGianBatDau"
            >
              <DatePicker
                style={{ width: '100%' }}
                showTime
                showHour
                showMinute
                format="HH:mm DD/MM/YYYY"
                size="large"
              />
            </Form.Item>
            <Form.Item label="Thời gian thi (phút)" name="thoiGianThi">
              <Input
                placeholder="Nhập thời gian thi tính bằng đơn vị phút"
                allowClear
                size="large"
              />
            </Form.Item>
          </Form>
        </Col>
      </Row>
      <Divider />
      <Row gutter={[8, 10]}>
        <Col span={8}>
          <Typography>Lớp học</Typography>
        </Col>
        <Col span={8}>
          <Typography>Đề thi</Typography>
        </Col>
        <Col span={8}>
          <Typography>Giám thị</Typography>
        </Col>
        <Col span={8} style={{ minHeight: '100%' }}>
          <Card
            hoverable
            style={{ minHeight: '100%' }}
            onClick={() => {
              setSelectingLopHoc(!selectingLopHoc);
              setSelectingDeThi(false);
              setSelectingGiamThi(false);
            }}
          >
            {(selectedLopHoc && (
              <Typography>{selectedLopHoc.tenLop}</Typography>
            )) || (
              <Typography>
                <i>Chưa chọn lớp học</i>
              </Typography>
            )}
          </Card>
        </Col>
        <Col span={8}>
          <Card
            hoverable
            style={{ minHeight: '100%' }}
            onClick={() => {
              setSelectingLopHoc(false);
              setSelectingDeThi(!selectingDeThi);
              setSelectingGiamThi(false);
            }}
          >
            {(selectedDeThi && (
              <Typography>{selectedDeThi.tenDeThi}</Typography>
            )) || (
              <Typography>
                <i>Chưa chọn đề thi</i>
              </Typography>
            )}
          </Card>
        </Col>
        <Col span={8} style={{ minHeight: '100%' }}>
          <Card
            hoverable
            style={{ minHeight: '100%' }}
            onClick={() => {
              setSelectingLopHoc(false);
              setSelectingDeThi(false);
              setSelectingGiamThi(!selectingGiamThi);
            }}
          >
            {(selectedGiamThi && (
              <Typography>{selectedGiamThi.hoTen}</Typography>
            )) || (
              <Typography>
                <i>Chưa chọn giám thị</i>
              </Typography>
            )}
          </Card>
        </Col>
      </Row>
      {(selectingLopHoc || selectingDeThi || selectingGiamThi) && <Divider />}
      {selectingLopHoc && (
        <>
          <Typography style={{ marginBottom: 8 }}>Danh sách lớp học</Typography>
          <Row gutter={[10, 10]}>
            {dsLopHoc.map((lh) => (
              <Col span={8}>
                <Card
                  hoverable
                  onClick={() => {
                    setSelectedLopHoc(lh);
                    setSelectingLopHoc(false);
                    setSelectingDeThi(false);
                    setSelectingGiamThi(false);
                  }}
                >
                  {lh.tenLop}
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )}
      {selectingDeThi && (
        <>
          <Typography style={{ marginBottom: 8 }}>Danh sách đề thi</Typography>
          <Row gutter={[10, 10]}>
            {dsDeThi.map((dt) => (
              <Col span={8}>
                <Card
                  hoverable
                  onClick={() => {
                    setSelectedDeThi(dt);
                    setSelectingLopHoc(false);
                    setSelectingDeThi(false);
                    setSelectingGiamThi(false);
                  }}
                >
                  {dt.tenDeThi}
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )}
      {selectingGiamThi && (
        <>
          <Typography style={{ marginBottom: 8 }}>
            Danh sách giám thị
          </Typography>
          <Row gutter={[10, 10]}>
            {dsGiamThi.map((gt) => (
              <Col span={8}>
                <Card
                  hoverable
                  onClick={() => {
                    setSelectedGiamThi(gt);
                    setSelectingLopHoc(false);
                    setSelectingDeThi(false);
                    setSelectingGiamThi(false);
                  }}
                >
                  {gt.hoTen}
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )}
    </Modal>
  );
}

export default UpdateCaThiModal;
