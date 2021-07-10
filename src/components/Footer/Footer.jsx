import React from 'react';

export const Footer = () => {
  return (
    <>
      <div className='d-flex justify-content-between bg-white'>
        <div className='pt-1rem f-nowrap'>
          &copy; {new Date().getFullYear()}
        </div>
        <div className='d-flex'>
          <a
            href='https://www.linkedin.com/in/connectwithnoor'
            className='p-1rem f-nowrap'>
            Noor Muhammad
          </a>
        </div>
      </div>
    </>
  );
};

export default Footer;
