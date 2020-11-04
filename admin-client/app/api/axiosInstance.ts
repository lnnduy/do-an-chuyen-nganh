import axios from 'axios';

function getToken(): string | null {
  return localStorage.getItem('token');
}

function axiosInstance(path: string, authRequired: boolean = true) {
  const axiosInstace = axios.create({
    baseURL: `https://localhost:5001/api/${path}`,
    headers: {
      Authorization: authRequired && `Bearer ${getToken()}`,
    },
  });

  const httpGet = (path: string = '') => axiosInstace.get(path);
  const httpPost = (path: string = '', data: any) =>
    axiosInstace.post(path, { ...data });
  const httpPut = (path: string = '', data: any) =>
    axiosInstace.put(path, { ...data });
  const httpDelete = (path: string = '') => axiosInstace.delete(path);

  return {
    get: httpGet,
    post: httpPost,
    put: httpPut,
    delete: httpDelete,
  };
}

export default axiosInstance;
