import React, { useEffect, useContext, useState } from 'react';
import { Table, Spin } from 'antd';

import AppLayout from '../Layout/AppLayout';
import { columns, dataSource } from '../utils/userViewBookingTableColumn';

import { getUserBookingDetails } from '../firebase/firebaseDb';
import { AppContext } from '../context/AppContext';
import { errorNotification } from '../utils/functions/notificationToasts';

function ViewBooking() {
  const [tableData, setTableData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { userDetails } = useContext(AppContext);

  useEffect(() => {
    const checkBooking = async () => {
      try {
        setLoading(true);
        const { success, results, errorMessage } = await getUserBookingDetails({
          userId: userDetails.id,
        });

        if (errorMessage) {
          return errorNotification({
            title: 'Error Occured',
            description: errorMessage,
          });
        }

        if (success) {
          setTableData(results);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    checkBooking();
  }, [userDetails]);

  console.log(tableData);

  return (
    <AppLayout>
      <div className='w-75 m-auto'>
        <Spin spinning={loading}>
          <Table dataSource={tableData} columns={columns} />
        </Spin>
      </div>
    </AppLayout>
  );
}

export default ViewBooking;
