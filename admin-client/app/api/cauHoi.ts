import handleErrors from '../shared/handleErrors';
import axiosInstance from './axiosInstance';

const apiKhoCauHoi = axiosInstance('kho-cau-hoi');
const apiCauHoi = axiosInstance('cau-hoi');

async function getDsCauHoi(idKhoCauHoi: number): Promise<any> {
  let res = null;
  try {
    const { data } = await apiKhoCauHoi.get(`${idKhoCauHoi}/cau-hoi`);
    res = data;
    return data;
  } catch (error) {
    handleErrors(error);
    console.log(error);
    return res;
  }
}

async function themCauHoiVaoKhoCauHoi(
  idKhoCauHoi: number,
  cauHoi: any
): Promise<any> {
  let res = null;
  try {
    const { data } = await apiKhoCauHoi.post(`${idKhoCauHoi}/cau-hoi`, {
      ...cauHoi,
    });
    res = data;
    return data;
  } catch (error) {
    handleErrors(error);
    console.log(error);
    return res;
  }
}

async function capNhatCauHoi(id: number, cauHoi: any): Promise<any> {
  let res = null;
  try {
    const { data } = await apiCauHoi.put(`${id}`, {
      ...cauHoi,
    });
    res = data;
    return data;
  } catch (error) {
    handleErrors(error);
    console.log(error);
    return res;
  }
}

async function xoaCauHoi(id: number): Promise<any> {
  let res = null;
  try {
    const { data } = await apiCauHoi.delete(`${id}`);
    res = data;
    return data;
  } catch (error) {
    handleErrors(error);
    console.log(error);
    return res;
  }
}

export default {
  getDsCauHoi,
  themCauHoiVaoKhoCauHoi,
  capNhatCauHoi,
  xoaCauHoi,
};
