import axiosInstance from './axiosInstance';

const apiHocPhan = axiosInstance('hoc-phan');
const apiKhoCauHoi = axiosInstance('kho-cau-hoi');

async function getDsKhoCauHoi(idHocPhan: number): Promise<any> {
  let res = null;
  try {
    const { data } = await apiHocPhan.get(`${idHocPhan}/kho-cau-hoi`);
    res = data;
    return data;
  } catch (error) {
    console.log(error);
    return res;
  }
}

async function themKhoCauHoiVaoHocPhan(
  idHocPhan: number,
  khoCauHoi: any
): Promise<any> {
  let res = null;
  try {
    const { data } = await apiHocPhan.post(`${idHocPhan}/kho-cau-hoi`, {
      ...khoCauHoi,
    });
    res = data;
    return data;
  } catch (error) {
    console.log(error);
    return res;
  }
}

async function capNhatKhoCauHoi(id: number, khoCauHoi: any): Promise<any> {
  let res = null;
  try {
    const { data } = await apiKhoCauHoi.put(`${id}`, {
      ...khoCauHoi,
    });
    res = data;
    return data;
  } catch (error) {
    console.log(error);
    return res;
  }
}

async function xoaKhoCauHoi(id: number): Promise<any> {
  let res = null;
  try {
    const { data } = await apiKhoCauHoi.delete(`${id}`);
    res = data;
    return data;
  } catch (error) {
    console.log(error);
    return res;
  }
}

export default {
  getDsKhoCauHoi,
  themKhoCauHoiVaoHocPhan,
  capNhatKhoCauHoi,
  xoaKhoCauHoi,
};
