import { ColumnType } from 'antd/es/table';
import {
  tenCaThiSorter,
  idSorter,
  thoiGianBatDauSorter,
  thoiGianThiSorter,
} from './sorter';
import Actions from './Actions';
import { SortOrder } from 'antd/lib/table/interface';
import React from 'react';
import unixToDateString from '../../shared/unixToDateString';

const TRANG_THAI_DE_THI = {
  CHUA_BAT_DAU: 'Chưa bắt đầu',
  DA_BAT_DAU: 'Đã bắt đầu',
  DA_KET_THUC: 'Đã kết thúc',
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

const LopThiCell = (_: any, caThi: any) =>
  caThi.lopHoc !== null || caThi.lopHoc !== undefined
    ? caThi.lopHoc.tenLop
    : React.createElement(
        'i',
        { style: { color: '#aaa' } },
        'Không có dữ liệu'
      );

const DeThiCell = (_: any, caThi: any) =>
  caThi.deThi !== null || caThi.deThi !== undefined
    ? caThi.deThi.tenDeThi
    : React.createElement(
        'i',
        { style: { color: '#aaa' } },
        'Không có dữ liệu'
      );

const GiamThiCell = (_: any, caThi: any) =>
  caThi.giamThi !== null || caThi.giamThi !== undefined
    ? caThi.giamThi.hoTen
    : React.createElement(
        'i',
        { style: { color: '#aaa' } },
        'Không có dữ liệu'
      );

const thoiGianBatDauCell = (a: any) => unixToDateString(a);
const thoiGianThiCell = (a: any) => Math.round(a / 60) / 1000;

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
    title: 'Tên ca thi',
    dataIndex: 'tenCaThi',
    sorter: tenCaThiSorter,
    sortDirections,
    render: Cell,
  },
  {
    title: 'Thời gian bắt đầu',
    dataIndex: 'thoiGianBatDau',
    sorter: thoiGianBatDauSorter,
    sortDirections,
    render: thoiGianBatDauCell,
  },
  {
    title: 'Thời gian thi (phút)',
    dataIndex: 'thoiGianThi',
    sorter: thoiGianThiSorter,
    sortDirections,
    render: thoiGianThiCell,
  },
  {
    title: 'Lớp thi',
    render: LopThiCell,
  },
  {
    title: 'Đề thi',
    render: DeThiCell,
  },
  {
    title: 'Giám thị',
    render: GiamThiCell,
  },
  {
    title: 'Trạng thái',
    dataIndex: 'trangThai',
    filters: [
      { text: TRANG_THAI_DE_THI.CHUA_BAT_DAU, value: true },
      { text: TRANG_THAI_DE_THI.DA_BAT_DAU, value: false },
      { text: TRANG_THAI_DE_THI.DA_KET_THUC, value: false },
    ],
    onFilter: (value, dt) => dt.trangThai === value,
    render: Cell,
  },
  {
    render: (_: any, caThi: any) => (
      <Actions
        idHocPhan={caThi.idHocPhan}
        caThi={caThi}
        onDeleted={onDeleted}
        onUpdated={onUpdated}
      />
    ),
  },
];

export default columns;
