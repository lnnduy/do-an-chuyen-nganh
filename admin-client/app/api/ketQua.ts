import handleErrors from '../shared/handleErrors';
import axiosInstance from './axiosInstance';

const apiPublicKetQua = axiosInstance('public-ket-qua');

async function getKetQuaThiSinhTheoCaThi(idCaThi: number): Promise<any> {
  let res = null;
  try {
    const idSinhVien = localStorage.getItem('idSinhVien');
    const { data } = await apiPublicKetQua.get(
      `ca-thi/${idCaThi}/thi-sinh/${idSinhVien}`
    );
    res = data;
    return data;
  } catch (error) {
    handleErrors(error);
    console.log(error);
    return res;
  }
}

export default {
  getKetQuaThiSinhTheoCaThi,
};
