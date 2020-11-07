import axios from 'axios';

const getToken = (): string | null => {
  return localStorage.getItem('token');
};

function axiosInstance(path: string, authRequired: boolean = true) {
  const axiosInstace = axios.create({
    baseURL: `https://localhost:5001/api/${path}`,
  });

  const httpGet = (path: string = '') =>
    axiosInstace.get(path, {
      headers: {
        Authorization: authRequired && `Bearer ${getToken()}`,
      },
    });
  const httpPost = (path: string = '', data: any) =>
    axiosInstace.post(
      path,
      { ...data },
      {
        headers: {
          Authorization: authRequired && `Bearer ${getToken()}`,
        },
      }
    );
  const httpPut = (path: string = '', data: any) =>
    axiosInstace.put(
      path,
      { ...data },
      {
        headers: {
          Authorization: authRequired && `Bearer ${getToken()}`,
        },
      }
    );
  const httpDelete = (path: string = '') =>
    axiosInstace.delete(path, {
      headers: {
        Authorization: authRequired && `Bearer ${getToken()}`,
      },
    });

  return {
    get: httpGet,
    post: httpPost,
    put: httpPut,
    delete: httpDelete,
  };
}

export default axiosInstance;
