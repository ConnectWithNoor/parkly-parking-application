import React, { Suspense } from 'react';
import { Spin } from 'antd';

function SuspenseLoader({ children }) {
  return (
    <div>
      <Suspense fallback={<FallbackRender />}>{children}</Suspense>
    </div>
  );
}

function FallbackRender() {
  return (
    <div className='w-100vw h-100vh bg-gray-3'>
      <div className='w-75 m-auto'>
        <div className='flex-container'>
          <Spin size='large' />
          <p className='mt-1rem'>Loading...!</p>
        </div>
      </div>
    </div>
  );
}

export default SuspenseLoader;
