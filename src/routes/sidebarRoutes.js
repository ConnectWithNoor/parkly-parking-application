import {
  TabletOutlined,
  CarOutlined,
  ClockCircleOutlined,
  UserOutlined,
} from '@ant-design/icons';

const userRoutes = [
  {
    to: '/parking-section',
    icon: <TabletOutlined />,
    text: 'Parking section',
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
    icon: <UserOutlined />,
    text: 'Feedback',
  },
  {
    to: '/logout',
    icon: <TabletOutlined />,
    text: 'Logout',
  },
];

const adminRoutes = [];

export { userRoutes, adminRoutes };
