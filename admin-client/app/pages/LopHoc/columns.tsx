import { ColumnType } from 'antd/es/table';
import { idSorter, tenLopHocSorter } from './sorter';
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
    title: 'Tên lớp học',
    dataIndex: 'tenLop',
    sorter: tenLopHocSorter,
    sortDirections,
  },
  {
    render: (lopHoc) => (
      <Actions lopHoc={lopHoc} onDeleted={onDeleted} onUpdated={onUpdated} />
    ),
  },
];

export default columns;
