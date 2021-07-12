import { notification } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';

function errorNotification({
  title = 'An Error Occured',
  description = 'Something Went Wrong',
}) {
  notification.error({
    message: title,
    description: description,
    icon: <CloseOutlined className='c-red' />,
    duration: 0.5,
  });
}

function successNotification({ title, description }) {
  notification.success({
    message: title,
    description: description,
    icon: <CheckOutlined className='c-green' />,
    duration: 0.5,
  });
}

export { errorNotification, successNotification };
