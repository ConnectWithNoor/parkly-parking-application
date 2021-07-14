import { notification } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';

function errorNotification({
  title = 'An Error Occured',
  description = 'Something Went Wrong',
  duration = 0.5,
}) {
  notification.error({
    message: title,
    description: description,
    icon: <CloseOutlined className='c-red' />,
    duration: duration,
  });
}

function successNotification({ title, description, duration = 0.5 }) {
  notification.success({
    message: title,
    description: description,
    icon: <CheckOutlined className='c-green' />,
    duration: duration,
  });
}

export { errorNotification, successNotification };
