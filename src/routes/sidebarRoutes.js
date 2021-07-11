import {
  CarOutlined,
  ClockCircleOutlined,
  UserOutlined,
  MailOutlined,
  LockOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';

const userRoutes = [
  {
    to: '/parking-section',
    icon: <InfoCircleOutlined />,
    text: 'Parking Section',
  },
  {
    to: '/book-vehicle',
    icon: <CarOutlined />,
    text: 'Book Vehicle',
  },
  {
    to: '/view-booking',
    icon: <ClockCircleOutlined />,
    text: 'View Bookings',
  },
  {
    to: '/feedback',
    icon: <MailOutlined />,
    text: 'Feedback',
  },
];

const adminRoutes = [
  {
    to: '/view-students',
    icon: <UserOutlined />,
    text: 'View Students',
  },
  {
    to: '/view-booking',
    icon: <LockOutlined />,
    text: 'View Bookings',
  },
  {
    to: '/feedback',
    icon: <MailOutlined />,
    text: 'Feedback',
  },
];

export { userRoutes, adminRoutes };
