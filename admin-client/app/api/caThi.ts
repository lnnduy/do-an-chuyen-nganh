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

async function getDsCaThiDaNhan(): Promise<any> {
  let res = null;
  try {
    const { data } = await apiCaThi.get('da-nhan');
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

async function getMaBaoVeCaThi(id: number): Promise<any> {
  let res = null;
  try {
    const { data } = await apiCaThi.get(`${id}/ma-bao-ve`);
    res = data;
    return data;
  } catch (error) {
    handleErrors(error);
    console.log(error);
    return res;
  }
}

async function batDauCaThi(id: number, ticks: number): Promise<any> {
  let res = null;
  try {
    const { data } = await apiCaThi.get(`${id}/bat-dau-ca-thi/${ticks}`);
    res = data;
    return data;
  } catch (error) {
    handleErrors(error);
    console.log(error);
    return res;
  }
}

async function ketThucCaThi(id: number): Promise<any> {
  let res = null;
  try {
    const { data } = await apiCaThi.get(`${id}/ket-thuc-ca-thi`);
    res = data;
    return data;
  } catch (error) {
    handleErrors(error);
    console.log(error);
    return res;
  }
}

async function getDsThiSinhDaThamGia(id: number): Promise<any> {
  let res = null;
  try {
    const { data } = await apiCaThi.get(`${id}/thi-sinh-da-tham-gia`);
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
  getDsCaThiDaNhan,
  getMaBaoVeCaThi,
  getCaThi,
  batDauCaThi,
  ketThucCaThi,
  getDsThiSinhDaThamGia,
  themCaThiVaoHocPhan,
  capNhatCaThi,
  xoaCaThi,
};
