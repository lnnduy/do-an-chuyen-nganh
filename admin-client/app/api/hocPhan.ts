import handleErrors from '../shared/handleErrors';
import axiosInstance from './axiosInstance';

const api = axiosInstance('hoc-phan');

async function getDsHocPhan(): Promise<any> {
  let res = null;
  try {
    const { data } = await api.get('');
    res = data;
    return data;
  } catch (error) {
    handleErrors(error);
    console.log(error);
    return res;
  }
}

async function getHocPhan(id: number): Promise<any> {
  let res = null;
  try {
    const { data } = await api.get(`${id}`);
    res = data;
    return data;
  } catch (error) {
    handleErrors(error);
    console.log(error);
    return res;
  }
}

async function taoHocPhan(hocPhan: any): Promise<any> {
  let res = null;
  try {
    const { data } = await api.post('', { ...hocPhan });
    res = data;
    return data;
  } catch (error) {
    handleErrors(error);
    console.log(error);
    return res;
  }
}

async function capNhatHocPhan(id: number, hocPhan: any): Promise<any> {
  let res = null;
  try {
    const { data } = await api.put(`${id}`, { ...hocPhan });
    res = data;
    return data;
  } catch (error) {
    handleErrors(error);
    console.log(error);
    return res;
  }
}

async function xoaHocPhan(id: number): Promise<any> {
  let res = null;
  try {
    const { data } = await api.delete(`${id}`);
    res = data;
    return data;
  } catch (error) {
    handleErrors(error);
    console.log(error);
    return res;
  }
}

export default {
  getDsHocPhan,
  getHocPhan,
  taoHocPhan,
  capNhatHocPhan,
  xoaHocPhan,
};
