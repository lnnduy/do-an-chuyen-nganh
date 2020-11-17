import handleErrors from '../shared/handleErrors';
import axiosInstance from './axiosInstance';

const apiHocPhan = axiosInstance('hoc-phan');
const apiDeThi = axiosInstance('de-thi');

async function getDsDeThi(idHocPhan: number): Promise<any> {
  let res = null;
  try {
    const { data } = await apiHocPhan.get(`${idHocPhan}/de-thi`);
    res = data;
    return data;
  } catch (error) {
    handleErrors(error);
    console.log(error);
    return res;
  }
}

async function getDeThi(id: number): Promise<any> {
  let res = null;
  try {
    const { data } = await apiDeThi.get(`${id}`);
    res = data;
    return data;
  } catch (error) {
    handleErrors(error);
    console.log(error);
    return res;
  }
}

async function themDeThiVaoHocPhan(
  idHocPhan: number,
  deThi: any
): Promise<any> {
  let res = null;
  try {
    const { data } = await apiHocPhan.post(`${idHocPhan}/de-thi`, {
      ...deThi,
    });
    res = data;
    return data;
  } catch (error) {
    handleErrors(error);
    console.log(error);
    return res;
  }
}

async function capNhatDeThi(id: number, deThi: any): Promise<any> {
  let res = null;
  try {
    const { data } = await apiDeThi.put(`${id}`, {
      ...deThi,
    });
    res = data;
    return data;
  } catch (error) {
    handleErrors(error);
    console.log(error);
    return res;
  }
}

async function xoaDeThi(id: number): Promise<any> {
  let res = null;
  try {
    const { data } = await apiDeThi.delete(`${id}`);
    res = data;
    return data;
  } catch (error) {
    handleErrors(error);
    console.log(error);
    return res;
  }
}

export default {
  getDsDeThi,
  getDeThi,
  themDeThiVaoHocPhan,
  capNhatDeThi,
  xoaDeThi,
};
