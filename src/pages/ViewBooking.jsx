import React, { useEffect, useContext, useState } from 'react';
import { Table, Spin, Select } from 'antd';

import AppLayout from '../Layout/AppLayout';
import { columnData } from '../utils/userViewBookingTableColumn';

import { getUserBookingDetails } from '../firebase/firebaseDb';
import { AppContext } from '../context/AppContext';
import {
  errorNotification,
  successNotification,
} from '../utils/functions/notificationToasts';

const { Option } = Select;

function ViewBooking() {
  const [tableData, setTableData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sectionId, setSectionId] = useState(null);
  const [isDeleted, setIsDeleted] = useState(false);

  const { userDetails } = useContext(AppContext);

  useEffect(() => {
    const checkBooking = async () => {
      if (!sectionId) return setTableData(null);
      try {
        setLoading(true);
        const { success, results, errorMessage } = await getUserBookingDetails({
          userId: userDetails.id,
          sectionId,
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
  }, [sectionId, userDetails.id]);

  useEffect(() => {
    const checkIsDeleted = () => {
      if (!isDeleted) return;

      setTableData(null);

      successNotification({
        title: 'Parking Reservation Cancelled',
        description: 'Your Parking Reservation is cancelled successfully',
        duration: 2,
      });

      setTimeout(() => {
        setIsDeleted(false);
      }, 2500);
    };

    checkIsDeleted();
  }, [isDeleted]);

  const handleSectionChange = (val) => {
    setSectionId(val);
  };

  return (
    <AppLayout>
      <div className='w-75 m-auto'>
        <div className='bg-gray-3 t-center radius-1'>
          <div className='w-50 m-auto d-flex justify-content-between align-items-center flex-wrap'>
            <p className='pt-1rem f-bold '>Please select the parking section</p>
            <Select
              style={{ width: 200 }}
              placeholder='Select Parking Section'
              onChange={handleSectionChange}
              value={sectionId}>
              <Option value={null}> --Select-- </Option>
              <Option value='1'>Section 1</Option>
              <Option value='2'>Section 2</Option>
              <Option value='3'>Section 3</Option>
            </Select>
          </div>
          <div className='p-1rem'>
            <Spin spinning={loading}>
              <Table
                dataSource={tableData}
                columns={columnData(sectionId, setIsDeleted)}
                rowKey='uid'
                pagination={{
                  pageSize: 5,
                }}
              />
            </Spin>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

export default ViewBooking;
