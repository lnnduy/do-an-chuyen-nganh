import handleErrors from '../shared/handleErrors';
import axiosInstance from './axiosInstance';

const api = axiosInstance('tai-khoan');

async function getDsTaiKhoan(): Promise<any> {
  let res = null;
  try {
    const { data } = await api.get('list');
    res = data;
    return data;
  } catch (error) {
    handleErrors(error);
    return res;
  }
}

async function taoTaiKhoan(taiKhoan: any): Promise<any> {
  let res = null;
  try {
    const { data } = await api.post('', { ...taiKhoan });
    res = data;
    return data;
  } catch (error) {
    handleErrors(error);
    return res;
  }
}

async function capNhatTaiKhoan(id: number, taiKhoan: any): Promise<any> {
  let res = null;
  try {
    const { data } = await api.put(`${id}`, { ...taiKhoan });
    res = data;
    return data;
  } catch (error) {
    handleErrors(error);
    return res;
  }
}

async function xoaTaiKhoan(id: number): Promise<any> {
  let res = null;
  try {
    const { data } = await api.delete(`${id}`);
    res = data;
    return data;
  } catch (error) {
    handleErrors(error);
    return res;
  }
}

export default {
  getDsTaiKhoan,
  taoTaiKhoan,
  capNhatTaiKhoan,
  xoaTaiKhoan,
};
