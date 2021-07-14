import { Button, Space } from 'antd';

const columns = [
  {
    title: 'Parking Section',
    dataIndex: 'sectionId',
    key: 'sectionId',
  },
  {
    title: 'Parking Slot',
    dataIndex: 'spot_id',
    key: 'spot_id',
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Start Time',
    dataIndex: 'start_time',
    key: 'start_time',
  },
  {
    title: 'End Time',
    dataIndex: 'end_time',
    key: 'end_time',
  },
  {
    title: 'Total Hours',
    dataIndex: 'no_of_hour',
    key: 'no_of_hour',
  },
  {
    title: 'Cancel Booking',
    dataIndex: 'total_hours',
    key: 'total_hours',
    render: () => (
      <Space size='middle'>
        <Button type='primary' className='bg-dark'>
          Cancel
        </Button>
      </Space>
    ),
  },
];

const dataSource = [
  {
    key: '1',
    parking_section: 1,
    parking_slot: 2,
    date: '10-8-20',
    start_time: '1:00PM',
    end_time: '4:00PM',
    total_hours: '3hrs',
  },
  {
    key: '2',
    parking_section: 1,
    parking_slot: 2,
    date: '10-8-20',
    start_time: '1:00PM',
    end_time: '4:00PM',
    total_hours: '3hrs',
  },
];

export { columns, dataSource };
