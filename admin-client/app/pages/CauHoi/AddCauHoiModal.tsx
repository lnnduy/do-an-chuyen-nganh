import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Radio,
  Row,
  Select,
  Space,
} from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import DO_KHO_CAU_HOI from '../../constants/do-kho-cau-hoi';
import { PlusOutlined } from '@ant-design/icons';
import CardDapAn from '../../components/CardDapAn';
import api from '../../api';
import handleErrors from '../../shared/handleErrors';

type Props = {
  idKhoCauHoi: number;
  visible: boolean;
  onCreated: Function;
  onCancel: Function;
};

function AddCauHoiModal({ visible, onCancel, idKhoCauHoi, onCreated }: Props) {
  const formRef = useRef<any>();
  const [dsDapAn, setDsDapAn] = useState(new Array<any>());
  const [nhieuDapAn, setNhieuDapAn] = useState<any>(null);
  const [dsIndexDapAnDung, setDsIndexDapAnDung] = useState<number[]>([]);
  const [fields, setFields] = useState<any[]>([]);

  const taoCauHoi = async (form?: any) => {
    if (form === undefined) {
      formRef.current?.submit();
      return;
    }
    const taoCauHoiRequest = { ...form, dsDapAn };

    try {
      const res = await api.cauHoi.themCauHoiVaoKhoCauHoi(
        idKhoCauHoi,
        taoCauHoiRequest
      );

      if (!res.success) {
        handleErrors(res);
        return;
      }

      const cauHoi = res.data;
      onCreated(cauHoi);
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
      else
        setDsDapAn([{ ...dsDapAn[1], dapAnDung: true }, ...dsDapAn.slice(2)]);
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
        value: '',
        touched: false,
        errors: [],
        validating: false,
      },
      {
        name: ['doKho'],
        value: DO_KHO_CAU_HOI.DE,
        touched: false,
        errors: [],
        validating: false,
      },
      {
        name: ['nhieuDapAn'],
        value: false,
        touched: false,
        errors: [],
        validating: false,
      },
    ]);
  }, []);

  return (
    <Modal
      style={{ paddingTop: 40 }}
      title="Tạo câu hỏi"
      visible={visible}
      onCancel={() => onCancel()}
      onOk={() => taoCauHoi()}
      okText="Tạo câu hỏi"
      cancelText="Huỷ"
      centered
      maskClosable={false}
      width={1040}
    >
      <Form
        layout="vertical"
        ref={formRef}
        onFinish={taoCauHoi}
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

export default AddCauHoiModal;
