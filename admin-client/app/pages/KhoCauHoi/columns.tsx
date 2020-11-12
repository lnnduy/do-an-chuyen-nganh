import { ColumnType } from 'antd/es/table';
import { tenKhoCauHoiSorter, idSorter } from './sorter';
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
    title: 'Tên kho câu hỏi',
    dataIndex: 'tenKhoCauHoi',
    sorter: tenKhoCauHoiSorter,
    sortDirections,
    render: Cell,
  },
  {
    title: 'Mô tả',
    dataIndex: 'moTa',
    render: Cell,
  },
  {
    render: (idHocPhan: number, khoCauHoi: any) => (
      <Actions
        idHocPhan={idHocPhan}
        khoCauHoi={khoCauHoi}
        onDeleted={onDeleted}
        onUpdated={onUpdated}
      />
    ),
  },
];

export default columns;
