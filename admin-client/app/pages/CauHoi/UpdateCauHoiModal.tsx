import {
  Input,
  Select,
  Radio,
  Space,
  Row,
  Button,
  Col,
  Form,
  Modal,
} from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import api from '../../api';
import CardDapAn from '../../components/CardDapAn';
import DO_KHO_CAU_HOI from '../../constants/do-kho-cau-hoi';
import handleErrors from '../../shared/handleErrors';
import { PlusOutlined } from '@ant-design/icons';

type Props = {
  visible: boolean;
  onUpdated: Function;
  onCancel: Function;
  cauHoi: any;
};

function UpdateCauHoiModal({ visible, onCancel, onUpdated, cauHoi }: Props) {
  const formRef = useRef<any>();
  const [dsDapAn, setDsDapAn] = useState(new Array<any>());
  const [nhieuDapAn, setNhieuDapAn] = useState<any>(null);
  const [dsIndexDapAnDung, setDsIndexDapAnDung] = useState<number[]>([]);
  const [fields, setFields] = useState<any[]>([]);
  const [dsIdDapAnCanXoa, setDsIdDapAnCanXoa] = useState<number[]>([]);

  const capNhatCauHoi = async (form?: any) => {
    if (form === undefined) {
      formRef.current?.submit();
      return;
    }

    const capNhatCauHoiRequest = { ...form };
    capNhatCauHoiRequest.dsDapAnMoi = dsDapAn.filter(
      (da: any) => da.id === undefined
    );
    capNhatCauHoiRequest.dsDapAnCanCapNhat = dsDapAn.filter(
      (da: any) => da.id !== undefined
    );
    capNhatCauHoiRequest.dsDapAnCanXoa = dsIdDapAnCanXoa;

    try {
      const res = await api.cauHoi.capNhatCauHoi(
        cauHoi.id,
        capNhatCauHoiRequest
      );

      if (!res.success) {
        handleErrors(res);
        console.log(res.errors);
        return;
      }

      onUpdated(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const themDapAn = () => {
    const emptyDapAn = {
      noiDung: '',
      dapAnDung: !dsDapAn.length,
    };
    setDsDapAn([emptyDapAn, ...dsDapAn]);
    setDsIndexDapAnDung(dsIndexDapAnDung.map((index) => index + 1));
  };

  const updateNoiDungDapAn = (index: number, noiDung: any) => {
    const dapAn = { ...dsDapAn[index], noiDung };
    if (dsDapAn.length === 1) {
      dapAn.dapAnDung = true;
      setDsIndexDapAnDung([0]);
    }

    setDsDapAn([
      ...dsDapAn.slice(0, index),
      dapAn,
      ...dsDapAn.slice(index + 1),
    ]);
  };

  const updateDapAnDung = (index: number, dapAnDung: boolean) => {
    if (!nhieuDapAn) {
      if (
        dsIndexDapAnDung.length === 1 &&
        dsIndexDapAnDung[0] === index &&
        !dapAnDung
      )
        return;

      if (dapAnDung) {
        setDsIndexDapAnDung([index]);
        setDsDapAn(
          dsDapAn.map((da, i) =>
            i === index
              ? { ...da, dapAnDung: true }
              : { ...da, dapAnDung: false }
          )
        );
      }
    } else {
      if (!dapAnDung && dsIndexDapAnDung.length === 1) return;

      if (dapAnDung) {
        setDsIndexDapAnDung([
          index,
          ...dsIndexDapAnDung.filter((i) => i !== index),
        ]);
        setDsDapAn([
          ...dsDapAn.slice(0, index),
          { ...dsDapAn[index], dapAnDung: true },
          ...dsDapAn.slice(index + 1),
        ]);
      } else {
        setDsIndexDapAnDung([...dsIndexDapAnDung.filter((i) => i !== index)]);
        setDsDapAn([
          ...dsDapAn.slice(0, index),
          { ...dsDapAn[index], dapAnDung: false },
          ...dsDapAn.slice(index + 1),
        ]);
      }
    }
  };

  const deleteDapAn = (index: number) => {
    setDsIdDapAnCanXoa([dsDapAn[index].id, ...dsIdDapAnCanXoa]);
    setDsDapAn([...dsDapAn.slice(0, index), ...dsDapAn.slice(index + 1)]);
    if (dsDapAn.length === 1) setDsIndexDapAnDung([]);
    else if (
      (!nhieuDapAn &&
        dsIndexDapAnDung.includes(index) &&
        dsIndexDapAnDung.length === 1) ||
      (nhieuDapAn &&
        dsIndexDapAnDung.length === 1 &&
        dsIndexDapAnDung[0] === index)
    ) {
      setDsIndexDapAnDung([0]);
      if (index)
        setDsDapAn([
          { ...dsDapAn[0], dapAnDung: true },
          ...dsDapAn.slice(1, index),
          ...dsDapAn.slice(index + 1),
        ]);
      else {
        setDsDapAn([{ ...dsDapAn[1], dapAnDung: true }, ...dsDapAn.slice(2)]);
      }
    } else
      setDsIndexDapAnDung(
        dsIndexDapAnDung
          .filter((i) => i !== index)
          .map((i) => (i > index ? i - 1 : i))
      );
  };

  useEffect(() => {
    setFields([
      {
        name: ['noiDung'],
        value: cauHoi.noiDung,
        touched: false,
        errors: [],
        validating: false,
      },
      {
        name: ['doKho'],
        value: cauHoi.doKho,
        touched: false,
        errors: [],
        validating: false,
      },
      {
        name: ['nhieuDapAn'],
        value: cauHoi.nhieuDapAn,
        touched: false,
        errors: [],
        validating: false,
      },
    ]);
  }, [cauHoi]);

  useEffect(() => {
    setDsDapAn(cauHoi.dsDapAn);
  }, [cauHoi]);

  useEffect(() => {
    setDsIndexDapAnDung(
      cauHoi.dsDapAn
        .map((da: any, i: number) => (da.dapAnDung === true ? i : null))
        .filter((i: number | null) => i !== null)
    );
  }, [cauHoi]);

  return (
    <Modal
      title="Cập nhật câu hỏi"
      visible={visible}
      onCancel={() => onCancel()}
      onOk={() => capNhatCauHoi()}
      okText="Cập nhật câu hỏi"
      cancelText="Huỷ"
      centered
      maskClosable={false}
      width={1040}
    >
      <Form
        layout="vertical"
        ref={formRef}
        onFinish={capNhatCauHoi}
        onFieldsChange={(form) => {
          if (form[0]?.name?.toString() !== 'nhieuDapAn') return;
          const nhieuDapAn = form[0]?.value;
          setNhieuDapAn(nhieuDapAn);
          if (!nhieuDapAn) {
            setDsIndexDapAnDung(
              (dsIndexDapAnDung.length > 0 && [dsIndexDapAnDung[0]]) || []
            );
            setDsDapAn(
              dsDapAn.map((da, i) =>
                i === dsIndexDapAnDung[0]
                  ? { ...da, dapAnDung: true }
                  : { ...da, dapAnDung: false }
              )
            );
          }
        }}
        fields={fields}
      >
        <Form.Item
          name="noiDung"
          label="Nội dung câu hỏi"
          rules={[{ required: true, message: 'Chưa nhập nội dung câu hỏi' }]}
        >
          <Input.TextArea
            rows={3}
            placeholder="Nhập nội dung câu hỏi"
            size="large"
          />
        </Form.Item>
        <Form.Item
          name="doKho"
          label="Độ khó câu hỏi"
          rules={[{ required: true, message: 'Chưa chọn độ khó câu hỏi' }]}
        >
          <Select placeholder="Chọn độ khó câu hỏi" size="large">
            <Select.Option value={DO_KHO_CAU_HOI.DE}>
              {DO_KHO_CAU_HOI.DE}
            </Select.Option>
            <Select.Option value={DO_KHO_CAU_HOI.TRUNG_BINH}>
              {DO_KHO_CAU_HOI.TRUNG_BINH}
            </Select.Option>
            <Select.Option value={DO_KHO_CAU_HOI.KHO}>
              {DO_KHO_CAU_HOI.KHO}
            </Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="nhieuDapAn"
          label="Số đáp án đúng"
          rules={[{ required: true, message: 'Chưa chọn số đáp án đúng' }]}
        >
          <Radio.Group>
            <Radio value={false}>Một đáp án đúng</Radio>
            <Radio value={true}>Nhiều đáp án đúng</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        <Row>
          <Button
            type="primary"
            size="large"
            block
            icon={<PlusOutlined />}
            onClick={themDapAn}
          >
            Thêm đáp án
          </Button>
        </Row>
        <Row gutter={[10, 10]}>
          {dsDapAn.map((dapAn, index) => (
            <Col key={index} span={12}>
              <CardDapAn
                dapAn={dapAn}
                index={index}
                updateNoiDungDapAn={updateNoiDungDapAn}
                updateDapAnDung={updateDapAnDung}
                deleteDapAn={deleteDapAn}
                markRight={
                  nhieuDapAn
                    ? dsIndexDapAnDung.includes(index)
                    : dsIndexDapAnDung[0] === index
                }
              />
            </Col>
          ))}
        </Row>
      </Space>
    </Modal>
  );
}

export default UpdateCauHoiModal;
