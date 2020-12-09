import {
  Col,
  Form,
  Input,
  Modal,
  Row,
  Slider,
  Switch,
  Table,
  Typography,
} from 'antd';
import { on } from 'process';
import React, { useEffect, useRef, useState } from 'react';
import api from '../../api';
import handleErrors from '../../shared/handleErrors';

type Props = {
  visible: boolean;
  onCancel: Function;
  onCreated: Function;
  idHocPhan: number;
};

function AutopickerDeThiModal({
  visible,
  onCancel,
  onCreated,
  idHocPhan,
}: Props) {
  const formRef = useRef<any>(null);
  const [dsKhoCauHoi, setDsKhoCauHoi] = useState<any[]>([]);
  const [dsSelectedKhoCauHoi, setDsSelectedKhoCauHoi] = useState<any[]>([]);
  const [sliderValues, setSliderValues] = useState<[number, number]>([50, 80]);
  const [dsIdCauHoi, setDsIdCauHoi] = useState<any>({});
  const [fields, setFields] = useState<any[]>([]);
  const [calculatedSoLuongCauHoi, setCalculatedSoLuongCauHoi] = useState<{
    soLuongCauHoiDe: number;
    soLuongCauHoiTrungBinh: number;
    soLuongCauHoiKho: number;
  }>({
    soLuongCauHoiDe: 0,
    soLuongCauHoiTrungBinh: 0,
    soLuongCauHoiKho: 0,
  });
  const [loading, setLoading] = useState<boolean>(false);

  const loadKhoCauHoi = async () => {
    try {
      const res = await api.khoCauHoi.getDsKhoCauHoi(idHocPhan);

      if (!res.success) {
        console.log(res.errors);
        handleErrors(res);
        return;
      }

      var dsKhoCauHoi = res.data.map((kch: any) => ({
        ...kch,
        soLuongCauHoi:
          kch.soLuongCauHoiDe +
          kch.soLuongCauHoiTrungBinh +
          kch.soLuongCauHoiKho,
      }));
      console.log(dsKhoCauHoi);
      setDsKhoCauHoi(dsKhoCauHoi);
    } catch (error) {
      console.log(error);
    }
  };

  const loadIdCauHoi = async () => {
    try {
      const res = await api.cauHoi.getDsIdCauHoiByDsIdKhoCauHoi(
        dsSelectedKhoCauHoi.map((kch: any) => kch.id)
      );

      if (!res.success) {
        console.log(res.errors);
        handleErrors(res);
        return;
      }

      setDsIdCauHoi(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const taoDeThi = async (form?: any) => {
    setLoading(true);
    try {
      if (form === undefined) {
        formRef.current?.submit();
        return;
      }
      await loadIdCauHoi();

      setDsIdCauHoi({
        dsIdCauHoiDe: dsIdCauHoi.dsIdCauHoiDe.sort(
          (_id1: number, _id2: number) => Math.random() - 0.5
        ),
        dsIdCauHoiTrungBinh: dsIdCauHoi.dsIdCauHoiTrungBinh.sort(
          (_id1: number, _id2: number) => Math.random() - 0.5
        ),
        dsIdCauHoiKho: dsIdCauHoi.dsIdCauHoiKho.sort(
          (_id1: number, _id2: number) => Math.random() - 0.5
        ),
      });

      const taoDeThiRequest: {
        tenDeThi?: string;
        deThiThu?: boolean;
        dsIdCauHoi?: number[];
      } = {};
      taoDeThiRequest.tenDeThi = form.tenDeThi;
      taoDeThiRequest.deThiThu = form.deThiThu;
      taoDeThiRequest.dsIdCauHoi = [
        ...dsIdCauHoi.dsIdCauHoiDe.slice(
          0,
          calculatedSoLuongCauHoi.soLuongCauHoiDe
        ),
        ...dsIdCauHoi.dsIdCauHoiTrungBinh.slice(
          0,
          calculatedSoLuongCauHoi.soLuongCauHoiTrungBinh
        ),
        ...dsIdCauHoi.dsIdCauHoiKho.slice(
          0,
          calculatedSoLuongCauHoi.soLuongCauHoiKho
        ),
      ].sort((_id1: number, _id2: number) => Math.random() - 0.5);

      const res = await api.deThi.themDeThiVaoHocPhan(
        idHocPhan,
        taoDeThiRequest
      );

      if (!res.success) {
        console.log(res.errors);
        handleErrors(res);
        return;
      }

      onCreated(res.data);
      onCancel(false);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const getValueFieldSoLuongCauHoi = () => {
    const index = fields.findIndex(
      (f) => f.name.toString() === 'soLuongCauHoi'
    );
    const soLuongCauHoi = fields[index].value;
    return +soLuongCauHoi;
  };

  const chonCauHoi = () => {
    const tiLeCauHoiDe = +(sliderValues[0] / 100);
    const tiLeCauHoiTrungBinh = +((sliderValues[1] - sliderValues[0]) / 100);
    const tiLeCauHoiKho = +((100 - sliderValues[1]) / 100);
    const soLuongCauHoi = getValueFieldSoLuongCauHoi();
    let soLuongCauHoiDeMongMuon =
      Math.round(soLuongCauHoi * tiLeCauHoiDe) +
      (soLuongCauHoi * tiLeCauHoiDe - Math.round(soLuongCauHoi * tiLeCauHoiDe) >
      2 / 3
        ? 1
        : 0);
    let soLuongCauHoiTrungBinhMongMuon =
      Math.round(soLuongCauHoi * tiLeCauHoiTrungBinh) +
      (soLuongCauHoi * tiLeCauHoiTrungBinh -
        Math.round(soLuongCauHoi * tiLeCauHoiTrungBinh) >
      2 / 3
        ? 1
        : 0);
    let soLuongCauHoiKhoMongMuon =
      Math.round(soLuongCauHoi * tiLeCauHoiKho) +
      (soLuongCauHoi * tiLeCauHoiKho -
        Math.round(soLuongCauHoi * tiLeCauHoiKho) >
      2 / 3
        ? 1
        : 0);
    let soLuongCauHoiDeChuaChon = dsSelectedKhoCauHoi.reduce(
      (total: number, kch: any) => total + kch.soLuongCauHoiDe,
      0
    );
    let soLuongCauHoiTrungBinhChuaChon = dsSelectedKhoCauHoi.reduce(
      (total: number, kch: any) => total + kch.soLuongCauHoiTrungBinh,
      0
    );
    let soLuongCauHoiKhoChuaChon = dsSelectedKhoCauHoi.reduce(
      (total: number, kch: any) => total + kch.soLuongCauHoiKho,
      0
    );
    let soLuongCauHoiDe = 0;
    let soLuongCauHoiTrungBinh = 0;
    let soLuongCauHoiKho = 0;

    while (
      (soLuongCauHoiDeMongMuon > 0 ||
        soLuongCauHoiTrungBinhMongMuon > 0 ||
        soLuongCauHoiKhoMongMuon > 0) &&
      soLuongCauHoiDe + soLuongCauHoiTrungBinh + soLuongCauHoiKho <
        getValueFieldSoLuongCauHoi()
    ) {
      const soLuongDe = Math.min(
        soLuongCauHoiDeChuaChon,
        soLuongCauHoiDeMongMuon
      );
      soLuongCauHoiDe += soLuongDe;
      soLuongCauHoiDeMongMuon -= soLuongDe;
      soLuongCauHoiDeChuaChon -= soLuongDe;

      const soLuongTrungBinh = Math.min(
        soLuongCauHoiTrungBinhChuaChon,
        soLuongCauHoiTrungBinhMongMuon
      );
      soLuongCauHoiTrungBinh += soLuongTrungBinh;
      soLuongCauHoiTrungBinhMongMuon -= soLuongTrungBinh;
      soLuongCauHoiTrungBinhChuaChon -= soLuongTrungBinh;

      const soLuongKho = Math.min(
        soLuongCauHoiKhoChuaChon,
        soLuongCauHoiKhoMongMuon
      );
      soLuongCauHoiKho += soLuongKho;
      soLuongCauHoiKhoMongMuon -= soLuongKho;
      soLuongCauHoiKhoChuaChon -= soLuongKho;

      if (soLuongCauHoiDeMongMuon > 0 && soLuongCauHoiDeChuaChon === 0) {
        const soLuongCauHoiTrungBinhBoSung = Math.min(
          soLuongCauHoiDeMongMuon,
          soLuongCauHoiTrungBinhChuaChon
        );
        soLuongCauHoiDeMongMuon -= soLuongCauHoiTrungBinhBoSung;
        soLuongCauHoiTrungBinhMongMuon += soLuongCauHoiTrungBinhBoSung;

        const soLuongCauHoiKhoBoSung = Math.min(
          soLuongCauHoiDeMongMuon,
          soLuongCauHoiKhoChuaChon
        );
        soLuongCauHoiDeMongMuon -= soLuongCauHoiKhoBoSung;
        soLuongCauHoiKhoMongMuon += soLuongCauHoiKhoBoSung;
      }

      if (
        soLuongCauHoiTrungBinhMongMuon > 0 &&
        soLuongCauHoiTrungBinhChuaChon === 0
      ) {
        const soLuongCauHoiKhoBoSung = Math.min(
          soLuongCauHoiTrungBinhMongMuon,
          soLuongCauHoiKhoChuaChon
        );
        soLuongCauHoiTrungBinhMongMuon -= soLuongCauHoiKhoBoSung;
        soLuongCauHoiKhoMongMuon += soLuongCauHoiKhoBoSung;

        const soLuongCauHoiDeBoSung = Math.min(
          soLuongCauHoiTrungBinhMongMuon,
          soLuongCauHoiDeChuaChon
        );
        soLuongCauHoiTrungBinhMongMuon -= soLuongCauHoiDeBoSung;
        soLuongCauHoiDeMongMuon += soLuongCauHoiDeBoSung;
      }

      if (soLuongCauHoiKhoMongMuon > 0 && soLuongCauHoiKhoChuaChon === 0) {
        const soLuongCauHoiTrungBinhBoSung = Math.min(
          soLuongCauHoiKhoMongMuon,
          soLuongCauHoiTrungBinhChuaChon
        );
        soLuongCauHoiKhoMongMuon -= soLuongCauHoiTrungBinhBoSung;
        soLuongCauHoiTrungBinhMongMuon += soLuongCauHoiTrungBinhBoSung;

        const soLuongCauHoiDeBoSung = Math.min(
          soLuongCauHoiKhoMongMuon,
          soLuongCauHoiDeChuaChon
        );
        soLuongCauHoiKhoMongMuon -= soLuongCauHoiDeBoSung;
        soLuongCauHoiDeMongMuon += soLuongCauHoiDeBoSung;
      }
    }

    while (
      soLuongCauHoiDe + soLuongCauHoiTrungBinh + soLuongCauHoiKho <
      getValueFieldSoLuongCauHoi()
    ) {
      if (soLuongCauHoiDeChuaChon > 0) soLuongCauHoiDe++;
      else if (soLuongCauHoiTrungBinhChuaChon > 0) soLuongCauHoiTrungBinh++;
      else if (soLuongCauHoiKhoChuaChon > 0) soLuongCauHoiKho++;
    }

    setCalculatedSoLuongCauHoi({
      soLuongCauHoiDe,
      soLuongCauHoiTrungBinh,
      soLuongCauHoiKho,
    });
  };

  useEffect(() => {
    loadKhoCauHoi();
  }, []);

  useEffect(() => {
    setFields([
      {
        name: ['tenDeThi'],
        value: '',
        touched: false,
        errors: [],
        validating: false,
      },
      {
        name: ['soLuongCauHoi'],
        value: '',
        touched: false,
        errors: [],
        validating: false,
      },
      {
        name: ['deThiThu'],
        value: false,
        touched: false,
        errors: [],
        validating: false,
      },
    ]);
  }, []);

  useEffect(() => {
    if (dsSelectedKhoCauHoi.length > 0 && getValueFieldSoLuongCauHoi())
      chonCauHoi();
  }, [sliderValues, fields, dsSelectedKhoCauHoi]);

  return (
    <Modal
      title="Thêm đề thi (tự động)"
      visible={visible}
      onCancel={() => onCancel(false)}
      width={1600}
      centered
      style={{ paddingTop: 40 }}
      onOk={() => taoDeThi()}
      confirmLoading={loading}
    >
      <Row gutter={[20, 0]}>
        <Col span={10}>
          <Form
            layout="vertical"
            onFinish={taoDeThi}
            ref={formRef}
            fields={fields}
            onFieldsChange={(field) => {
              const index = fields.findIndex(
                (f) => f.name[0] === field[0]?.name?.toString()
              );
              if (index === -1) return;
              setFields([
                ...fields.slice(0, index),
                field[0],
                ...fields.slice(index + 1),
              ]);
            }}
          >
            <Form.Item
              label="Tên đề thi"
              name="tenDeThi"
              rules={[{ required: true, message: 'Chưa nhập tên đề thi' }]}
            >
              <Input size="large" placeholder="Nhập tên đề thi" />
            </Form.Item>
            <Form.Item
              name="soLuongCauHoi"
              label="Số lượng câu hỏi"
              rules={[
                { required: true, message: 'Chưa nhập số lượng câu hỏi' },
                {
                  validator: (_, v, cb) => {
                    const soLuongCauHoiToiDa = dsSelectedKhoCauHoi.reduce(
                      (total: number, kch: any) => total + kch.soLuongCauHoi,
                      0
                    );
                    if (Number.isNaN(+v) || +v < 1 || +v > soLuongCauHoiToiDa)
                      cb(
                        `Cần nhập số nguyên và có giá trị từ 1 đến ${soLuongCauHoiToiDa} hoặc chọn thêm kho câu hỏi`
                      );
                    else cb(undefined);
                  },
                },
              ]}
            >
              <Input
                size="large"
                placeholder="Nhập số lượng câu hỏi có trong đề thi"
                type="number"
                min={1}
                max={dsSelectedKhoCauHoi.reduce(
                  (total: number, kch: any) => total + kch.soLuongCauHoi,
                  0
                )}
              />
            </Form.Item>
            <Form.Item
              label="Đề thi thử"
              name="deThiThu"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
          </Form>
          <div className="custom-slider">
            <span
              style={{
                display: 'inline-block',
                height: 4,
                width: `${sliderValues[0]}%`,
                backgroundColor: 'green',
              }}
            />
            <span
              style={{
                display: 'inline-block',
                height: 4,
                width: `${sliderValues[1] - sliderValues[0]}%`,
                backgroundColor: 'orangered',
              }}
            />
            <span
              style={{
                display: 'inline-block',
                height: 4,
                width: `${100 - sliderValues[1]}%`,
                backgroundColor: 'red',
              }}
            />
            <Slider range value={sliderValues} onChange={setSliderValues} />
          </div>
          <div></div>
        </Col>
        <Col span={14}>
          <Typography style={{ marginBottom: 8 }}>{`Đã chọn ${
            dsSelectedKhoCauHoi.length
          } kho câu hỏi và có tổng cộng ${dsSelectedKhoCauHoi.reduce(
            (total: number, kch: any) => total + kch.soLuongCauHoi,
            0
          )} câu hỏi`}</Typography>
          <Table
            rowSelection={{
              type: 'checkbox',
              onChange: (_: any, list: any) => setDsSelectedKhoCauHoi(list),
              selectedRowKeys: dsSelectedKhoCauHoi.map(
                (selected) => selected.key
              ),
            }}
            columns={[
              { title: 'ID', dataIndex: 'id' },
              { title: 'Tên kho câu hỏi', dataIndex: 'tenKhoCauHoi' },
              { title: 'Số lượng câu hỏi', dataIndex: 'soLuongCauHoi' },
              { title: 'Số câu hỏi dễ', dataIndex: 'soLuongCauHoiDe' },
              {
                title: 'Số câu hỏi trung bình',
                dataIndex: 'soLuongCauHoiTrungBinh',
              },
              { title: 'Số câu hỏi khó', dataIndex: 'soLuongCauHoiKho' },
            ]}
            dataSource={dsKhoCauHoi.map((kch) => ({
              ...kch,
              key: kch.id + '',
            }))}
          />
        </Col>
      </Row>
    </Modal>
  );
}

export default AutopickerDeThiModal;
