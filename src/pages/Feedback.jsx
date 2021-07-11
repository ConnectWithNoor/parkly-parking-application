import React, { useState } from 'react';
import { Table, Input, Button, Modal, Space } from 'antd';

import { feedbackTableColumn, dataSource } from '../utils/FeedbackTableColumns';
import AppLayout from '../Layout/AppLayout';

const { TextArea } = Input;

function Feedback() {
  const [feedbackMessage, setFeedbackMessage] = useState(null);
  const [showModel, setShowModel] = useState(false);
  const [selectedRowMessage, setSelectedRowMessage] = useState(null);

  const handleChange = (e) => {
    setFeedbackMessage(e.target.value);
  };

  const handleModalOpen = (record) => {
    setSelectedRowMessage(record);
    setShowModel(true);
  };

  return (
    <AppLayout>
      <div className='w-75 m-auto'>
        <div className='w-100 bg-white f-lato font-size-3 t-center radius-1 p-1rem mb-1rem'>
          Your Feedbacks
        </div>
        <Table
          dataSource={dataSource}
          columns={feedbackTableColumn}
          pagination={{
            pageSize: 5,
            current: 1,
          }}
          onRow={(record) => {
            return {
              onClick: () => handleModalOpen(record),
            };
          }}
        />
        <div className='mt-1rem'>
          <TextArea
            rows={4}
            value={feedbackMessage}
            onChange={handleChange}
            placeholder='Feedback Message Here'
          />
        </div>
        <div className='mt-1rem'>
          <Button type='primary bg-dark' disabled={!feedbackMessage}>
            Submit Feedback
          </Button>
        </div>

        {/* modal */}
        <Modal
          title='Basic Modal'
          visible={showModel}
          onOk={() => setShowModel(false)}
          onCancel={() => setShowModel(false)}>
          <div className='p-halfrem'>
            <div className='mt-1rem'>
              <p>Your Feedback</p>
              <TextArea
                rows={4}
                value={selectedRowMessage?.feedback_text}
                onChange={handleChange}
                placeholder='Feedback Message Here'
                disabled
              />
            </div>

            <div className='mt-1rem'>
              <p>Admin's Reply</p>

              <TextArea
                rows={4}
                value={selectedRowMessage?.feedback_text}
                onChange={handleChange}
                placeholder='Feedback Message Here'
                disabled
              />
            </div>
          </div>
        </Modal>
      </div>
    </AppLayout>
  );
}

export default Feedback;
