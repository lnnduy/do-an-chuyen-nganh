import handleErrors from '../shared/handleErrors';
import axiosInstance from './axiosInstance';

const apiHocPhan = axiosInstance('hoc-phan');
const apiCaThi = axiosInstance('ca-thi');

async function getDsCaThi(idHocPhan: number): Promise<any> {
  let res = null;
  try {
    const { data } = await apiHocPhan.get(`${idHocPhan}/ca-thi`);
    res = data;
    return data;
  } catch (error) {
    handleErrors(error);
    console.log(error);
    return res;
  }
}

async function getCaThi(id: number): Promise<any> {
  let res = null;
  try {
    const { data } = await apiCaThi.get(`${id}`);
    res = data;
    return data;
  } catch (error) {
    handleErrors(error);
    console.log(error);
    return res;
  }
}

async function themCaThiVaoHocPhan(
  idHocPhan: number,
  caThi: any
): Promise<any> {
  let res = null;
  try {
    const { data } = await apiHocPhan.post(`${idHocPhan}/ca-thi`, {
      ...caThi,
    });
    res = data;
    return data;
  } catch (error) {
    handleErrors(error);
    console.log(error);
    return res;
  }
}

async function capNhatCaThi(id: number, caThi: any): Promise<any> {
  let res = null;
  try {
    const { data } = await apiCaThi.put(`${id}`, {
      ...caThi,
    });
    res = data;
    return data;
  } catch (error) {
    handleErrors(error);
    console.log(error);
    return res;
  }
}

async function xoaCaThi(id: number): Promise<any> {
  let res = null;
  try {
    const { data } = await apiCaThi.delete(`${id}`);
    res = data;
    return data;
  } catch (error) {
    handleErrors(error);
    console.log(error);
    return res;
  }
}

export default {
  getDsCaThi,
  getCaThi,
  themCaThiVaoHocPhan,
  capNhatCaThi,
  xoaCaThi,
};
