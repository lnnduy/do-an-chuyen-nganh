import { ColumnType } from 'antd/es/table';
import {
  idSorter,
  usernameSorter,
  hoTenSorter,
  emailSorter,
  soDienThoaiSorter,
  gioiTinhSorter,
} from './sorter';
import Actions from './Actions';
import { SortOrder } from 'antd/lib/table/interface';
import QUYEN_TRUY_CAP from '../../constants/quyen-truy-cap';
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
    title: 'Tài khoản',
    dataIndex: 'username',
    sorter: usernameSorter,
    sortDirections,
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
    title: 'Giới tính',
    dataIndex: 'gioiTinh',
    sorter: gioiTinhSorter,
    sortDirections,
    render: Cell,
  },
  {
    title: 'Quyền truy cập',
    dataIndex: 'quyenTruyCap',
    filters: [
      {
        text: QUYEN_TRUY_CAP.QUAN_TRI_VIEN,
        value: QUYEN_TRUY_CAP.QUAN_TRI_VIEN,
      },
      { text: QUYEN_TRUY_CAP.CAN_BO, value: QUYEN_TRUY_CAP.CAN_BO },
    ],
    onFilter: (value, a) => a.quyenTruyCap === value,
  },
  {
    render: (taiKhoan) => (
      <Actions
        taiKhoan={taiKhoan}
        onDeleted={onDeleted}
        onUpdated={onUpdated}
      />
    ),
  },
];

export default columns;
