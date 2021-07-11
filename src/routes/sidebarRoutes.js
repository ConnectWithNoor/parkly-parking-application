import {
  CarOutlined,
  ClockCircleOutlined,
  UserOutlined,
  MailOutlined,
  LockOutlined,
  InfoCircleOutlined,
  LogoutOutlined,
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
  {
    to: '/logout',
    icon: <LogoutOutlined />,
    text: 'Logout',
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
  {
    to: '/logout',
    icon: <LogoutOutlined />,
    text: 'Logout',
  },
];

export { userRoutes, adminRoutes };
