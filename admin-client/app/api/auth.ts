import handleErrors from '../shared/handleErrors';
import axiosInstance from './axiosInstance';

const api = axiosInstance('tai-khoan');

async function signIn(username: string, matKhau: string): Promise<any> {
  try {
    const { data } = await api.post('dang-nhap', { username, matKhau });
    return data;
  } catch (error) {
    handleErrors(error);
    console.log(error);
    return null;
  }
}

async function getUser(): Promise<any> {
  try {
    const { data } = await api.get('');
    return data;
  } catch (error) {
    handleErrors(error);
    console.log(error);
    return null;
  }
}

export default {
  signIn,
  getUser,
};
