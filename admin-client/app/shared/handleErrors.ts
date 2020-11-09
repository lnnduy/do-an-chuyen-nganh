import { notification } from 'antd';

const handleErrors = (error: any) => {
  if (error === null) {
    notification.error({
      message: 'Đã có lỗi xảy ra',
      description: 'Đã xảy ra lỗi ở hệ thống!',
      duration: 2,
    });
    return;
  }

  if (error.message !== undefined && error.message.includes(401))
    error = { statusCode: 401 };

  switch (error.statusCode) {
    case 400:
    case 403:
    case 404:
      notification.error({
        message: 'Đã có lỗi xảy ra',
        description: error.errors.join('. '),
        duration: 2,
      });
      break;
    case 401: {
      setTimeout(() => window.location.replace('/dang-nhap'), 2100);
      notification.info({
        message: 'Phiên làm việc đã hết hạn',
        description: 'Vui lòng đăng nhập lại.',
        duration: 2,
      });
      break;
    }
    case 500:
    default:
      notification.error({
        message: 'Đã có lỗi xảy ra',
        description: 'Đã xảy ra lỗi ở hệ thống!',
        duration: 2,
      });
  }
};

export default handleErrors;
