import { Button, Space } from 'antd';

import { cancelParkingReservationById } from '../firebase/firebaseDb';

const columnData = (sectionId, setIsDeleted) => [
  {
    title: 'Parking Slot',
    dataIndex: 'spot_id',
    key: 'spot_id',
    align: 'center',
    render: (text) => <div className='t-center'>{text}</div>,
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    align: 'center',
    render: (text) => <div className='t-center'>{text}</div>,
  },
  {
    title: 'Start Time',
    dataIndex: 'start_time',
    key: 'start_time',
    align: 'center',

    render: (text) => <div className='t-center'>{text}</div>,
  },
  {
    title: 'End Time',
    dataIndex: 'end_time',
    key: 'end_time',
    align: 'center',

    render: (text) => <div className='t-center'>{text}</div>,
  },
  {
    title: 'Total Hours',
    dataIndex: 'no_of_hour',
    key: 'no_of_hour',
    align: 'center',

    render: (text) => <div className='t-center'>{text}</div>,
  },
  {
    title: '',
    dataIndex: 'total_hours',
    key: 'total_hours',
    render: (_, data) => {
      return (
        <Space size='middle'>
          <Button
            type='primary'
            className='bg-dark'
            onClick={() =>
              cancelParkingReservationById(sectionId, data.uid, setIsDeleted)
            }>
            Cancel
          </Button>
        </Space>
      );
    },
  },
];

export { columnData };
