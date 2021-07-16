import React, { useState, useEffect, useContext } from 'react';
import { Table, Spin } from 'antd';

import AppLayout from '../../Layout/AppLayout';
import { columnData } from '../../utils/viewStudentsTableColumn';
import { changeUserStatus, getAllUsersData } from '../../firebase/firebaseDb';
import {
  errorNotification,
  successNotification,
} from '../../utils/functions/notificationToasts';
import { AppContext } from '../../context/AppContext';

function ViewStudents() {
  const [tableData, setTableData] = useState(null);
  const [loading, setLoading] = useState(false);

  const { userDetails } = useContext(AppContext);

  const checkUsers = async () => {
    try {
      setLoading(true);
      const { success, results, errorMessage } = await getAllUsersData();
      if (errorMessage) {
        return errorNotification({
          title: 'Error occured',
          description: errorMessage,
          duration: 2,
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

  useEffect(() => {
    checkUsers();
  }, []);

  const updateUserStatus = async ({ userId, status }) => {
    try {
      setLoading(true);
      const { errorMessage, success } = await changeUserStatus(userId, status);
      if (errorMessage) {
        return errorNotification({
          title: 'Error occured',
          description: errorMessage,
          duration: 2,
        });
      }

      if (success) {
        checkUsers();
        return successNotification({
          title: 'Updation Successful',
          description: 'Student account status updated Successfully',
          duration: 2,
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className='w-75 m-auto'>
        <div className='bg-gray-3 t-center radius-1 p-1rem'>
          <Spin spinning={loading}>
            <Table
              dataSource={tableData}
              columns={columnData({ userId: userDetails.id, updateUserStatus })}
              rowKey='email'
              pagination={{ pageSize: 5 }}
            />
          </Spin>
        </div>
      </div>
    </AppLayout>
  );
}

export default ViewStudents;
