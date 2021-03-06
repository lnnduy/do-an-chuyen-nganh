import { ColumnType } from 'antd/es/table';
import { idSorter, tenHocPhanSorter } from './sorter';
import Actions from './Actions';
import { SortOrder } from 'antd/lib/table/interface';
import React from 'react';

const sortDirections: SortOrder[] = ['ascend', 'descend'];

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
    title: 'Tên học phần',
    dataIndex: 'tenHocPhan',
    sorter: tenHocPhanSorter,
    sortDirections,
  },
  {
    render: (hocPhan) => (
      <Actions hocPhan={hocPhan} onDeleted={onDeleted} onUpdated={onUpdated} />
    ),
  },
];

export default columns;
