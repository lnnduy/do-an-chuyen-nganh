import { CompareFn } from 'antd/lib/table/interface';

export const idSorter: CompareFn<any> = (a1: any, a2: any) => {
  return a1.id - a2.id;
};

export const tenDeThiSorter: CompareFn<any> = (a1: any, a2: any) => {
  const s1: string = a1.tenDeThi;
  const s2: string = a2.tenDeThi;
  return (s1 || '').localeCompare(s2 || '');
};

export const soLuongCauHoiDeSorter: CompareFn<any> = (a1: any, a2: any) => {
  return a1.soLuongCauHoiDe - a2.soLuongCauHoiDe;
};

export const soLuongCauHoiTrungBinhSorter: CompareFn<any> = (
  a1: any,
  a2: any
) => {
  return a1.soLuongCauHoiTrungBinh - a2.soLuongCauHoiTrungBinh;
};

export const soLuongCauHoiKhoSorter: CompareFn<any> = (a1: any, a2: any) => {
  return a1.soLuongCauHoiKho - a2.soLuongCauHoiKho;
};

export const soLuongCauHoiSorter: CompareFn<any> = (a1: any, a2: any) => {
  a1.soLuongCauHoi =
    a1.soLuongCauHoiDe + a1.soLuongCauHoiTrungBinh + a1.soLuongCauHoiKho;
  a2.soLuongCauHoi =
    a2.soLuongCauHoiDe + a2.soLuongCauHoiTrungBinh + a2.soLuongCauHoiKho;
  return a1.soLuongCauHoi - a2.soLuongCauHoi;
};
