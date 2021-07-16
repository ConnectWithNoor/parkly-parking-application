import { Button, Space } from 'antd';

const columnData = ({ userId, updateUserStatus }) => [
  {
    title: 'User Id',
    dataIndex: 'id',
    key: 'id',
    align: 'center',
    render: (text) => <div className='t-center'>{text}</div>,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    align: 'center',
    render: (text) => <div className='t-center'>{text}</div>,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    align: 'center',
    render: (text) => <div className='t-center'>{text}</div>,
  },
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
    align: 'center',
    render: (text) => <div className='t-center'>{text}</div>,
  },
  {
    title: 'Status',
    dataIndex: 'active',
    key: 'active',
    align: 'center',
    render: (text) => <div className='t-center'>{text ? 'Yes' : 'No'}</div>,
  },
  {
    title: '',
    dataIndex: 'disable_account',
    key: 'disable_account',
    align: 'center',
    render: (_, data) => (
      <Space size='middle'>
        {data.active ? (
          <Button
            type='primary'
            className='bg-dark'
            disabled={data.id === userId}
            onClick={() =>
              updateUserStatus({ userId: data.id, status: false })
            }>
            Disable Account
          </Button>
        ) : (
          <Button
            type='primary'
            className='bg-dark'
            disabled={data.id === userId}
            onClick={() => updateUserStatus({ userId: data.id, status: true })}>
            Enable Account
          </Button>
        )}
      </Space>
    ),
  },
];

export { columnData };
