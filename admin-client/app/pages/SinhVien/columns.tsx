import { ColumnType } from 'antd/es/table';
import {
  emailSorter,
  gioiTinhSorter,
  hoTenSorter,
  idSorter,
  soDienThoaiSorter,
  diaChiSorter,
} from './sorter';
import Actions from './Actions';
import { SortOrder } from 'antd/lib/table/interface';
import React from 'react';

const sortDirections: SortOrder[] = ['ascend', 'descend'];
const Cell = (a: any) =>
  (!!a && a) ||
  React.createElement('i', { style: { color: '#aaa' } }, 'Không có dữ liệu');

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
    title: 'MSSV',
    dataIndex: 'mssv',
    sorter: hoTenSorter,
    sortDirections,
    render: Cell,
  },
  {
    title: 'Họ tên',
    dataIndex: 'hoTen',
    sorter: hoTenSorter,
    sortDirections,
    render: Cell,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    sorter: emailSorter,
    sortDirections,
    render: Cell,
  },
  {
    title: 'Số điện thoại',
    dataIndex: 'soDienThoai',
    sorter: soDienThoaiSorter,
    sortDirections,
    render: Cell,
  },
  {
    title: 'Địa chỉ',
    dataIndex: 'diaChi',
    sorter: diaChiSorter,
    sortDirections,
    render: Cell,
  },
  {
    title: 'Giới tính',
    dataIndex: 'gioiTinh',
    sorter: gioiTinhSorter,
    sortDirections,
    render: Cell,
  },
  {
    render: (idLopHoc: number, sinhVien: any) => (
      <Actions
        idLopHoc={idLopHoc}
        sinhVien={sinhVien}
        onDeleted={onDeleted}
        onUpdated={onUpdated}
      />
    ),
  },
];

export default columns;
