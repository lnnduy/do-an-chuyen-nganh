import { CompareFn } from 'antd/lib/table/interface';

export const idSorter: CompareFn<any> = (a1: any, a2: any) => {
  return a1.id - a2.id;
};

export const tenCaThiSorter: CompareFn<any> = (a1: any, a2: any) => {
  const s1: string = a1.tenCaThi;
  const s2: string = a2.tenCaThi;
  return (s1 || '').localeCompare(s2 || '');
};

export const thoiGianBatDauSorter: CompareFn<any> = (a1: any, a2: any) => {
  return a1.thoiGianBatDau - a2.thoiGianBatDau;
};

export const thoiGianThiSorter: CompareFn<any> = (a1: any, a2: any) => {
  return a1.thoiGianThi - a2.thoiGianThi;
};
