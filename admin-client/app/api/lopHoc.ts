import handleErrors from '../shared/handleErrors';
import axiosInstance from './axiosInstance';

const api = axiosInstance('lop-hoc');

async function getDsLopHoc(): Promise<any> {
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

async function getLopHoc(id: number): Promise<any> {
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

async function taoLopHoc(lopHoc: any): Promise<any> {
  let res = null;
  try {
    const { data } = await api.post('', { ...lopHoc });
    res = data;
    return data;
  } catch (error) {
    handleErrors(error);
    console.log(error);
    return res;
  }
}

async function capNhatLopHoc(id: number, lopHoc: any): Promise<any> {
  let res = null;
  try {
    const { data } = await api.put(`${id}`, { ...lopHoc });
    res = data;
    return data;
  } catch (error) {
    handleErrors(error);
    console.log(error);
    return res;
  }
}

async function xoaLopHoc(id: number): Promise<any> {
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
  getDsLopHoc,
  getLopHoc,
  taoLopHoc,
  capNhatLopHoc,
  xoaLopHoc,
};
