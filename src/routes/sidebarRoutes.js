import {
  TabletOutlined,
  CarOutlined,
  ClockCircleOutlined,
  UserOutlined,
} from '@ant-design/icons';

const userRoutes = [
  {
    to: '/user/#parking-section',
    icon: <TabletOutlined />,
    text: 'Parking section',
  },
  {
    to: '/user/#book-vehicle',
    icon: <CarOutlined />,
    text: 'Book Vehicle',
  },
  {
    to: '/user/#view-booking',
    icon: <ClockCircleOutlined />,
    text: 'View Bookings',
  },
  {
    to: '/user/#feedback',
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
