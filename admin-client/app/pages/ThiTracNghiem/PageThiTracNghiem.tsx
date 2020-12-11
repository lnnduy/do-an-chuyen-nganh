import { Button, Card, Col, Descriptions, Row, Space, Typography } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import api from '../../api';
import TRANG_THAI_CA_THI from '../../constants/trang-thai-ca-thi';
import handleErrors from '../../shared/handleErrors';
import actions from '../../store/actions';

function PageThiTracNghiem() {
  const dispatch = useDispatch();
  const caThi = useMemo<any>(
    () => JSON.parse(localStorage.getItem('caThi') || '{}'),
    undefined
  );
  const [loadedDeThi, setLoadedDeThi] = useState<boolean>(false);
  const [dsCauHoi, setDsCauHoi] = useState<any[]>([]);
  const [ketQua, setKetQua] = useState<any>(null);
  const [daNopBai, setDaNopBai] = useState<boolean>(false);

  const loadDeThi = async () => {
    try {
      const res = await api.publicCaThi.getDeThi(caThi.id);

      if (!res.success) {
        console.log(res.errors);
        handleErrors(res);
        return;
      }

      setLoadedDeThi(true);
      setDsCauHoi(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const chonDapAn = async (idCauHoi: number, idDapAn: number) => {
    const cauHoiIndex = dsCauHoi.findIndex((ch) => ch.id === idCauHoi);
    const cauHoi = dsCauHoi[cauHoiIndex];
    const dapAnIndex = cauHoi.dsDapAn.findIndex((da: any) => da.id === idDapAn);
    const dapAn = cauHoi.dsDapAn[dapAnIndex];

    try {
      if (!cauHoi.nhieuDapAn) {
        const res = await api.publicCaThi.chonDapAn(
          caThi.id,
          idCauHoi,
          idDapAn
        );

        if (!res.success) {
          console.log(res.errors);
          handleErrors(res);
          return;
        }

        cauHoi.dsDapAn = cauHoi.dsDapAn.map((da: any) => ({
          ...da,
          selected: false,
        }));
        cauHoi.dsDapAn[dapAnIndex] = { ...dapAn, selected: true };
      } else {
        const res =
          (cauHoi.dsDapAn[dapAnIndex].selected &&
            (await api.publicCaThi.boChonDapAn(caThi.id, idCauHoi, idDapAn))) ||
          (await api.publicCaThi.chonDapAn(caThi.id, idCauHoi, idDapAn));

        if (!res.success) {
          console.log(res.errors);
          handleErrors(res);
          return;
        }

        cauHoi.dsDapAn[dapAnIndex] = {
          ...dapAn,
          selected: !cauHoi.dsDapAn[dapAnIndex].selected,
        };
      }

      setDsCauHoi([
        ...dsCauHoi.slice(0, cauHoiIndex),
        cauHoi,
        ...dsCauHoi.slice(cauHoiIndex + 1),
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  const loadKetQua = async () => {
    try {
      const res = await api.ketQua.getKetQuaThiSinhTheoCaThi(caThi.id);

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

  const nopBai = async () => {
    try {
      const res = await api.publicCaThi.nopBai(caThi.id);

      if (!res.success) {
        console.log(res.errors);
        handleErrors(res);
        return;
      }

      setDaNopBai(true);
      setDsCauHoi([]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(actions.app.updateTitle(`${caThi.tenCaThi}`));
    setDaNopBai(caThi.trangThaiThi === 'Đã nộp bài');
  }, []);

  return (
    <Space
      direction="vertical"
      style={{
        width: '100%',
        padding: 0,
        paddingBottom: 15,
        minHeight: 'calc(100vh - 30px)',
        maxHeight: 'calc(100vh - 30px)',
        overflow: 'auto',
        backgroundColor: '#303030',
      }}
    >
      <Typography.Title
        level={2}
        style={{ textAlign: 'center', marginTop: 15 }}
      >
        {caThi.tenCaThi}
      </Typography.Title>
      {!daNopBai &&
        !loadedDeThi &&
        caThi.trangThai === TRANG_THAI_CA_THI.DA_BAT_DAU && (
          <Row justify="center">
            <Col span={6}>
              <Button
                block
                type="primary"
                size="large"
                onClick={() => loadDeThi()}
              >
                Lấy đề thi
              </Button>
            </Col>
          </Row>
        )}
      {(daNopBai || caThi.trangThai === TRANG_THAI_CA_THI.DA_KET_THUC) && (
        <Row justify="center">
          <Col span={6}>
            <Button
              block
              type="primary"
              size="large"
              onClick={() => loadKetQua()}
            >
              Xem kết quả
            </Button>
          </Col>
        </Row>
      )}
      {ketQua === null && caThi.trangThai === TRANG_THAI_CA_THI.DA_BAT_DAU && (
        <Row style={{ marginTop: 50 }} justify="center">
          {dsCauHoi.map((ch, i) => (
            <Col
              key={ch.id}
              span={18}
              style={{ padding: '0 12px', marginBottom: 50 }}
            >
              <Card>
                <Typography.Title level={4}>
                  <pre>{`Câu ${i + 1}${
                    ch.nhieuDapAn ? ' (nhiều đáp án)' : ''
                  }: ${ch.noiDung}`}</pre>
                </Typography.Title>
                <Space direction="vertical" style={{ width: '100%' }}>
                  {ch.dsDapAn.map((da: any) => (
                    <Card
                      key={da.id}
                      hoverable
                      onClick={() => chonDapAn(ch.id, da.id)}
                      style={da.selected ? { borderColor: 'green' } : {}}
                    >
                      <Typography>
                        <pre>{da.noiDung}</pre>
                      </Typography>
                    </Card>
                  ))}
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      )}
      {(ketQua !== null ||
        caThi.trangThai === TRANG_THAI_CA_THI.DA_KET_THUC) && (
        <Row style={{ marginTop: 50 }} justify="center">
          <Col span={18} style={{ padding: '0 12px', marginBottom: 50 }}>
            <Space direction="vertical" style={{ width: '100%' }} size="large">
              <Row>
                <Col span={24}>
                  <Card>
                    <Descriptions title="Thông tin sinh viên và kết quả thi">
                      <Descriptions.Item label="Mã số sinh viên">
                        {ketQua?.sinhVien?.mssv}
                      </Descriptions.Item>
                      <Descriptions.Item label="Họ và tên">
                        {ketQua?.sinhVien?.hoTen}
                      </Descriptions.Item>
                      <Descriptions.Item label="Tên ca thi">
                        {ketQua?.caThi?.tenCaThi}
                      </Descriptions.Item>
                      <Descriptions.Item label="Tổng số câu hỏi">
                        {ketQua?.dsKetQuaCauHoi?.length}
                      </Descriptions.Item>
                      <Descriptions.Item label="Số câu trả lời đúng">
                        {
                          ketQua?.dsKetQuaCauHoi?.filter(
                            (kqch: any) => kqch.traLoiDung === true
                          )?.length
                        }
                      </Descriptions.Item>
                      <Descriptions.Item label="Số câu trả lời sai">
                        {
                          ketQua?.dsKetQuaCauHoi?.filter(
                            (kqch: any) => kqch.traLoiDung === false
                          )?.length
                        }
                      </Descriptions.Item>
                      <Descriptions.Item label="Điểm">
                        {Math.floor(
                          (10 / ketQua?.dsKetQuaCauHoi?.length) *
                            ketQua?.dsKetQuaCauHoi?.filter(
                              (kqch: any) => kqch.traLoiDung === true
                            )?.length *
                            100 || 0
                        ) / 100}
                      </Descriptions.Item>
                    </Descriptions>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Card style={{ padding: '0 12px', marginBottom: 50 }}>
                    <Typography.Title level={5}>
                      Danh sách câu trả lời và kết quả
                    </Typography.Title>
                    <Space
                      direction="vertical"
                      style={{ width: '100%' }}
                      size="large"
                    >
                      {ketQua?.dsKetQuaCauHoi?.map((kqch: any, i: number) => (
                        <Card
                          key={i}
                          style={
                            kqch.traLoiDung
                              ? { borderColor: 'green' }
                              : { borderColor: 'red' }
                          }
                        >
                          <Typography.Title level={4}>{`Câu ${i + 1}${
                            kqch.nhieuDapAn ? ' (nhiều đáp án)' : ''
                          }: ${kqch.noiDung}`}</Typography.Title>
                          <Space direction="vertical" style={{ width: '100%' }}>
                            {kqch?.dsKetQuaDapAn?.map((da: any, j: number) => (
                              <Card
                                key={`${i}-${j}`}
                                style={
                                  da.dapAnDung
                                    ? { borderColor: 'green' }
                                    : !da.dapAnDung && da.dapAnDaChon
                                    ? { borderColor: 'red' }
                                    : {}
                                }
                              >
                                <Typography>{da.noiDung}</Typography>
                              </Card>
                            ))}
                          </Space>
                        </Card>
                      ))}
                    </Space>
                  </Card>
                </Col>
              </Row>
            </Space>
          </Col>
        </Row>
      )}
      {!daNopBai &&
        loadedDeThi &&
        caThi.trangThai === TRANG_THAI_CA_THI.DA_BAT_DAU && (
          <Row justify="center">
            <Col span={6}>
              <Button block type="primary" size="large" onClick={nopBai}>
                Nộp bài
              </Button>
            </Col>
          </Row>
        )}
    </Space>
  );
}

export default PageThiTracNghiem;
