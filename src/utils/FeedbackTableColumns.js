import { format_12_hoursTimeReturnStr } from './functions/momentTimeAndDate';

const feedbackTableColumn = [
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    align: 'center',
  },
  {
    title: 'Time',
    dataIndex: 'time',
    key: 'time',
    align: 'center',
    render: (text) => (
      <div className='t-center'>{format_12_hoursTimeReturnStr(text)}</div>
    ),
  },
  {
    title: 'Message',
    dataIndex: 'message',
    key: 'message',
    align: 'center',
  },
];

export { feedbackTableColumn };
