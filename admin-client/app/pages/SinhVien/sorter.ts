import { CompareFn } from 'antd/lib/table/interface';

export const idSorter: CompareFn<any> = (a1: any, a2: any) => {
  return a1.id - a2.id;
};

export const emailSorter: CompareFn<any> = (a1: any, a2: any) => {
  const s1: string = a1.email;
  const s2: string = a2.email;
  return (s1 || '').localeCompare(s2 || '');
};

export const gioiTinhSorter: CompareFn<any> = (a1: any, a2: any) => {
  const s1: string = a1.gioiTinh;
  const s2: string = a2.gioiTinh;
  return (s1 || '').localeCompare(s2 || '');
};

export const hoTenSorter: CompareFn<any> = (a1: any, a2: any) => {
  const s1: string = a1.hoTen;
  const s2: string = a2.hoTen;
  const n1: string = s1.split(' ').reverse()[0];
  const n2: string = s2.split(' ').reverse()[0];
  return (n1 || '').localeCompare(n2 || '');
};

export const soDienThoaiSorter: CompareFn<any> = (a1: any, a2: any) => {
  const s1: string = a1.soDienThoai;
  const s2: string = a2.soDienThoai;
  return (s1 || '').localeCompare(s2 || '');
};

export const diaChiSorter: CompareFn<any> = (a1: any, a2: any) => {
  const s1: string = a1.diaChi;
  const s2: string = a2.diaChi;
  return (s1 || '').localeCompare(s2 || '');
};
