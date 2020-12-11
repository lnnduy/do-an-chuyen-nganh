import handleErrors from '../shared/handleErrors';
import axiosInstance from './axiosInstance';

const apiPublicCaThi = axiosInstance('public-ca-thi', false);

const getDsCaThi = async () => {
  try {
    const idSinhVien = localStorage.getItem('idSinhVien');
    const { data } = await apiPublicCaThi.get(`${idSinhVien}`);
    return data;
  } catch (error) {
    handleErrors(error);
    console.log(error);
  }
};

const thamGiaCaThi = async (idCaThi: number, request: any) => {
  try {
    const idSinhVien = localStorage.getItem('idSinhVien');
    const { data } = await apiPublicCaThi.post(
      `${idSinhVien}/join/${idCaThi}`,
      request
    );
    return data;
  } catch (error) {
    handleErrors(error);
    console.log(error);
  }
};

const nopBai = async (idCaThi: number) => {
  try {
    const idSinhVien = localStorage.getItem('idSinhVien');
    const { data } = await apiPublicCaThi.get(
      `${idSinhVien}/${idCaThi}/nopBai`
    );
    return data;
  } catch (error) {
    handleErrors(error);
    console.log(error);
  }
};

const getDeThi = async (idCaThi: number) => {
  try {
    const idSinhVien = localStorage.getItem('idSinhVien');
    const { data } = await apiPublicCaThi.get(
      `${idSinhVien}/de-thi/${idCaThi}`
    );
    return data;
  } catch (error) {
    handleErrors(error);
    console.log(error);
  }
};

const chonDapAn = async (
  idCaThi: number,
  idCauHoi: number,
  idDapAn: number
) => {
  try {
    const idSinhVien = localStorage.getItem('idSinhVien');
    const { data } = await apiPublicCaThi.get(
      `${idSinhVien}/bai-lam/${idCaThi}/${idCauHoi}/${idDapAn}`
    );
    return data;
  } catch (error) {
    handleErrors(error);
    console.log(error);
  }
};

const boChonDapAn = async (
  idCaThi: number,
  idCauHoi: number,
  idDapAn: number
) => {
  try {
    const idSinhVien = localStorage.getItem('idSinhVien');
    const { data } = await apiPublicCaThi.delete(
      `${idSinhVien}/bai-lam/${idCaThi}/${idCauHoi}/${idDapAn}`
    );
    return data;
  } catch (error) {
    handleErrors(error);
    console.log(error);
  }
};

export default {
  getDsCaThi,
  thamGiaCaThi,
  getDeThi,
  boChonDapAn,
  chonDapAn,
  nopBai,
};
