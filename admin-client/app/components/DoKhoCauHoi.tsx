import { Space } from 'antd';
import React from 'react';

type Props = {
  doKho: 'Dễ' | 'Khó' | 'Trung bình';
};

function DoKhoCauHoi({ doKho }: Props) {
  return (
    <span title={`Độ khó: ${doKho}`}>
      <Space>
        {Array(doKho === 'Dễ' ? 1 : doKho === 'Trung bình' ? 2 : 3)
          .fill(null)
          .map((_, i) => (
            <span
              key={i}
              style={{
                display: 'inline-block',
                width: 12,
                height: 12,
                backgroundColor:
                  doKho === 'Dễ'
                    ? 'green'
                    : doKho === 'Trung bình'
                    ? 'orangered'
                    : 'red',
              }}
            />
          ))}
      </Space>
    </span>
  );
}

export default DoKhoCauHoi;
