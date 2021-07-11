import React from 'react';
import { Table } from 'antd';

import AppLayout from '../Layout/AppLayout';
import { columns, dataSource } from '../utils/userViewBookingTableColumn';

function viewStudents() {
  return (
    <AppLayout>
      <div className='w-75 m-auto'>
        <Table dataSource={dataSource} columns={columns} />
      </div>
    </AppLayout>
  );
}

export default viewStudents;
