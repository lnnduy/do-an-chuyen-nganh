import { ColumnType } from 'antd/es/table';
import {
  tenDeThiSorter,
  idSorter,
  soLuongCauHoiDeSorter,
  soLuongCauHoiTrungBinhSorter,
  soLuongCauHoiKhoSorter,
  soLuongCauHoiSorter,
} from './sorter';
import Actions from './Actions';
import { SortOrder } from 'antd/lib/table/interface';
import React from 'react';

const LOAI_DE_THI = {
  DE_THI_THU: 'Đề thi thử',
  DE_CHINH_THUC: 'Đề thi chính thức',
};

const TRANG_THAI_DE_THI = {
  SAN_SANG: 'Sẵn sàng',
  CHUA_SAN_SANG: 'Chưa sẵn sàng',
};

const sortDirections: SortOrder[] = ['ascend', 'descend'];
const Cell = (a: any) =>
  a !== null || a !== undefined
    ? a
    : React.createElement(
        'i',
        { style: { color: '#aaa' } },
        'Không có dữ liệu'
      );
const TotalQuestionCell = (_: any, d: any) =>
  d.soLuongCauHoiDe + d.soLuongCauHoiTrungBinh + d.soLuongCauHoiKho;
const LoaiDeThiCell = (_: any, d: any) =>
  d.deThiThu ? LOAI_DE_THI.DE_THI_THU : LOAI_DE_THI.DE_CHINH_THUC;
const TrangThaiDeThiCell = (_: any, d: any) =>
  d.sanSang ? TRANG_THAI_DE_THI.SAN_SANG : TRANG_THAI_DE_THI.CHUA_SAN_SANG;

const columns = (
  onUpdated: Function,
  onDeleted: Function
): ColumnType<any>[] => [
  {
    title: 'ID',
    dataIndex: 'id',
    sorter: idSorter,
    sortDirections,
  },
  {
    title: 'Tên đề thi',
    dataIndex: 'tenDeThi',
    sorter: tenDeThiSorter,
    sortDirections,
    render: Cell,
  },
  {
    title: 'Số câu hỏi dễ',
    dataIndex: 'soLuongCauHoiDe',
    sorter: soLuongCauHoiDeSorter,
    sortDirections,
    render: Cell,
  },
  {
    title: 'Số câu hỏi trung bình',
    dataIndex: 'soLuongCauHoiTrungBinh',
    sorter: soLuongCauHoiTrungBinhSorter,
    sortDirections,
    render: Cell,
  },
  {
    title: 'Số câu hỏi khó',
    dataIndex: 'soLuongCauHoiKho',
    sorter: soLuongCauHoiKhoSorter,
    sortDirections,
    render: Cell,
  },
  {
    title: 'Số câu hỏi',
    sorter: soLuongCauHoiSorter,
    sortDirections,
    render: TotalQuestionCell,
  },
  {
    title: 'Loại đề thi',
    dataIndex: 'deThiThu',
    filters: [
      { text: LOAI_DE_THI.DE_THI_THU, value: true },
      { text: LOAI_DE_THI.DE_CHINH_THUC, value: false },
    ],
    onFilter: (value, dt) => dt.deThiThu === value,
    render: LoaiDeThiCell,
  },
  {
    title: 'Trạng thái',
    dataIndex: 'sanSang',
    filters: [
      { text: TRANG_THAI_DE_THI.SAN_SANG, value: true },
      { text: TRANG_THAI_DE_THI.CHUA_SAN_SANG, value: false },
    ],
    onFilter: (value, dt) => dt.sanSang === value,
    render: TrangThaiDeThiCell,
  },
  {
    render: (_: any, deThi: any) => (
      <Actions
        idHocPhan={deThi.idHocPhan}
        deThi={deThi}
        onDeleted={onDeleted}
        onUpdated={onUpdated}
      />
    ),
  },
];

export default columns;
