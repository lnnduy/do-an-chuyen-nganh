import axiosInstance from './axiosInstance';

const api = axiosInstance('tai-khoan');

async function getDsTaiKhoan(): Promise<any> {
  try {
    const { data } = await api.get('list');
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function taoTaiKhoan(taiKhoan: any): Promise<any> {
  try {
    const { data } = await api.post('', { ...taiKhoan });
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function capNhatTaiKhoan(id: number, taiKhoan: any): Promise<any> {
  try {
    const { data } = await api.put(`${id}`, { ...taiKhoan });
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function xoaTaiKhoan(id: number): Promise<any> {
  try {
    const { data } = await api.delete(`${id}`);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export default {
  getDsTaiKhoan,
  taoTaiKhoan,
  capNhatTaiKhoan,
  xoaTaiKhoan,
};
