import { CompareFn } from 'antd/lib/table/interface';

export const idSorter: CompareFn<any> = (a1: any, a2: any) => {
  return a1.id - a2.id;
};

export const tenKhoCauHoiSorter: CompareFn<any> = (a1: any, a2: any) => {
  const s1: string = a1.tenKhoCauHoi;
  const s2: string = a2.tenKhoCauHoi;
  return (s1 || '').localeCompare(s2 || '');
};
