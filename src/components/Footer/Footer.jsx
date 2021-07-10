import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <>
      <div className='d-flex justify-content-between bg-white'>
        <div className='pt-1rem f-nowrap'>
          &copy; {new Date().getFullYear()}
        </div>
        <div className='d-flex'>
          <div className='p-1rem f-nowrap'>Noor Muhammad</div>
        </div>
      </div>
    </>
  );
};

export default Footer;
