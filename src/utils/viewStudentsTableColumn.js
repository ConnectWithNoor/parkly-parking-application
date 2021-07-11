import { Button, Space } from 'antd';

const columns = [
  {
    title: 'Id',
    dataIndex: '_id',
    key: '_id',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Enable/Disable Account',
    dataIndex: 'disable_account',
    key: 'disable_account',
    render: () => (
      <Space size='middle'>
        <Button type='primary' className='bg-dark'>
          Enable Account
        </Button>
      </Space>
    ),
  },
];

const dataSource = [
  {
    key: '1',
    _id: 1,
    name: 'Dishad',
    email: 'dildilpakistan@gmail.com',
  },
  {
    key: '2',
    _id: 2,
    name: 'Dishad',
    email: 'dildilpakistan@gmail.com',
  },
];

export { columns, dataSource };
