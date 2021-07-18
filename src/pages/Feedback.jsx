import React, { useState, useEffect, useContext } from 'react';
import { Table, Input, Button, Modal, Spin } from 'antd';

import { AppContext } from '../context/AppContext';

import { feedbackTableColumn } from '../utils/FeedbackTableColumns';
import {
  errorNotification,
  successNotification,
} from '../utils/functions/notificationToasts';

import AppLayout from '../Layout/AppLayout';

import {
  getAllFeedbackByUserId,
  getFeedbackAndCommentsByFeedbackId,
  getAllFeedbacks,
  addNewFeedback,
  addNewComment,
} from '../firebase/firebaseDb';

const { TextArea } = Input;

function Feedback() {
  const [feedbackMessage, setFeedbackMessage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(null);
  const [isModalLoading, setIsModalLoading] = useState(null);
  const [tableData, setTableData] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [adminReply, setAdminReply] = useState([]);

  const { userDetails } = useContext(AppContext);

  useEffect(() => {
    const checkFeedbackByUser = async () => {
      try {
        setIsLoading(true);
        const { success, results, errorMessage } = await getAllFeedbackByUserId(
          userDetails.id
        );
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
        setIsLoading(false);
      }
    };

    const checkFeedbackByRoot = async () => {
      try {
        setIsLoading(true);
        const { success, results, errorMessage } = await getAllFeedbacks();
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
        setIsLoading(false);
      }
    };

    userDetails.role === 'user' && checkFeedbackByUser();
    userDetails.role === 'root' && checkFeedbackByRoot();
  }, [userDetails]);

  useEffect(() => {
    const getComments = async () => {
      try {
        setIsModalLoading(true);

        const { success, results, errorMessage } =
          await getFeedbackAndCommentsByFeedbackId(selectedRow.uid);
        if (errorMessage) {
          return errorNotification({
            title: 'Error occured',
            description: errorMessage,
            duration: 2,
          });
        }
        if (success) {
          setAdminReply(results);
        }
      } catch (error) {
      } finally {
        setIsModalLoading(false);
      }
    };

    getComments();
  }, [selectedRow]);

  const handleChange = (e) => {
    setFeedbackMessage(e.target.value);
  };

  const handleModalOpen = (record) => {
    setSelectedRow(record);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setSelectedRow(null);
    setShowModal(false);
  };

  const handleSubmitUser = async () => {
    try {
      setIsLoading(true);
      const { success, results, errorMessage } = await addNewFeedback({
        message: feedbackMessage,
        userId: userDetails.id,
        role: userDetails.role,
      });

      if (errorMessage) {
        return errorNotification({
          title: 'Error occured',
          description: errorMessage,
          duration: 2,
        });
      }
      if (success) {
        setTableData((prev) => [results, ...prev]);
        setFeedbackMessage(null);
        return successNotification({
          title: 'Feedback Added successfully',
          description: errorMessage,
          duration: 2,
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitRoot = async () => {
    try {
      setIsLoading(true);
      const { success, results, errorMessage } = await addNewComment({
        message: feedbackMessage,
        userId: userDetails.id,
        role: userDetails.role,
        uid: selectedRow.uid,
      });

      if (errorMessage) {
        return errorNotification({
          title: 'Error occured',
          description: errorMessage,
          duration: 2,
        });
      }
      if (success) {
        setAdminReply((prev) => [results, ...prev]);
        setFeedbackMessage(null);
        return successNotification({
          title: 'Feedback Added successfully',
          description: errorMessage,
          duration: 2,
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className='w-75 m-auto'>
        <div className='bg-gray-3 t-center radius-1 p-1rem '>
          <div className='w-100 bg-white font-size-2 t-center radius-1 p-1rem'>
            <p className='pt-1rem f-bold '>Feedbacks</p>
          </div>
          <Spin spinning={isLoading}>
            <Table
              dataSource={tableData}
              columns={feedbackTableColumn}
              rowKey='uid'
              pagination={{
                pageSize: 5,
              }}
              onRow={(record) => {
                return {
                  onClick: () => handleModalOpen(record),
                };
              }}
            />
          </Spin>
          {userDetails.role === 'user' && (
            <>
              <div className='mt-1rem'>
                <TextArea
                  rows={4}
                  value={feedbackMessage}
                  onChange={handleChange}
                  placeholder='Feedback Message Here'
                />
              </div>
              <div className='mt-1rem'>
                <Button
                  type='primary bg-dark'
                  onClick={handleSubmitUser}
                  disabled={!feedbackMessage || isLoading}>
                  Submit Feedback
                </Button>
              </div>
            </>
          )}

          {/* modal */}
          <Modal
            title='Basic Modal'
            visible={showModal}
            onOk={handleModalClose}
            onCancel={handleModalClose}>
            <Spin spinning={isModalLoading}>
              <div className='p-halfrem'>
                <div className='mt-1rem'>
                  <p>Feedback</p>
                  <TextArea
                    rows={4}
                    value={selectedRow?.message}
                    placeholder='Feedback Message Here'
                  />
                </div>

                <div className='mt-1rem'>
                  <p>Admin's Reply</p>

                  {adminReply.map((reply) => (
                    <TextArea
                      rows={4}
                      value={reply?.message || feedbackMessage}
                      onChange={userDetails.role === 'root' && handleChange}
                      placeholder='Admin reply here'
                      className='mt-1rem'
                    />
                  ))}

                  {userDetails.role === 'root' && (
                    <Spin spinning={isLoading}>
                      <div className='mt-1rem'>
                        <TextArea
                          rows={4}
                          value={feedbackMessage}
                          onChange={handleChange}
                          placeholder='Feedback Message Here'
                        />
                      </div>
                      <div className='mt-1rem'>
                        <Button
                          type='primary bg-dark'
                          onClick={handleSubmitRoot}
                          disabled={!feedbackMessage || isLoading}>
                          Submit Feedback
                        </Button>
                      </div>
                    </Spin>
                  )}
                </div>
              </div>
            </Spin>
          </Modal>
        </div>
      </div>
    </AppLayout>
  );
}

export default Feedback;
