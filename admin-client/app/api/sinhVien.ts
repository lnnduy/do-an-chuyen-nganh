import handleErrors from '../shared/handleErrors';
import axiosInstance from './axiosInstance';

const apiLopHoc = axiosInstance('lop-hoc');
const apiSinhVien = axiosInstance('sinh-vien');

async function getDanhSachLop(idLopHoc: number): Promise<any> {
  let res = null;
  try {
    const { data } = await apiLopHoc.get(`${idLopHoc}/sinh-vien`);
    res = data;
    return data;
  } catch (error) {
    handleErrors(error);
    console.log(error);
    return res;
  }
}

async function getSinhVienByMssv(mssv: any): Promise<any> {
  let res = null;
  try {
    const { data } = await apiSinhVien.get(`${mssv}`);
    res = data;
    return data;
  } catch (error) {
    handleErrors(error);
    console.log(error);
    return res;
  }
}

async function themSinhVienVaoLop(
  idLopHoc: number,
  sinhVien: any
): Promise<any> {
  let res = null;
  try {
    const { data } = await apiLopHoc.post(`${idLopHoc}/sinh-vien`, {
      ...sinhVien,
    });
    res = data;
    return data;
  } catch (error) {
    handleErrors(error);
    console.log(error);
    return res;
  }
}

async function capNhatSinhVien(id: number, sinhVien: any): Promise<any> {
  let res = null;
  try {
    const { data } = await apiSinhVien.put(`${id}`, {
      ...sinhVien,
    });
    res = data;
    return data;
  } catch (error) {
    handleErrors(error);
    console.log(error);
    return res;
  }
}

async function xoaSinhVien(id: number): Promise<any> {
  let res = null;
  try {
    const { data } = await apiSinhVien.delete(`${id}`);
    res = data;
    return data;
  } catch (error) {
    handleErrors(error);
    console.log(error);
    return res;
  }
}

export default {
  getDanhSachLop,
  getSinhVienByMssv,
  themSinhVienVaoLop,
  capNhatSinhVien,
  xoaSinhVien,
};
