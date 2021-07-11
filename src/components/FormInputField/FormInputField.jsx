import React from 'react';
import { Form, Input } from 'antd';

function FormInputField({
  itemName,
  itemClassName,
  IconComponent,
  placeholder,
  type,
  targetName,
  targetValue,
  handleChange,
}) {
  return (
    <Form.Item name={itemName} className={itemClassName}>
      <Input
        prefix={<IconComponent className='site-form-item-icon' />}
        placeholder={placeholder}
        type={type}
        name={targetName}
        value={targetValue}
        onChange={handleChange}
        required
      />
    </Form.Item>
  );
}

export default FormInputField;
