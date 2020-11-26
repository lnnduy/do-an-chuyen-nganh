import os from 'os';

const getDiaChiIp = () => {
  const nets = os.networkInterfaces();
  let ip = null;
  Object.keys(nets).forEach((k) => {
    nets[k].forEach((n) => {
      if (n.family === 'IPv4' && !n.internal) ip = n.address;
    });
  });
  return ip;
};

export default getDiaChiIp;
