import React, { Component } from 'react';
import { Select } from 'antd';
const Option = Select.Option;

const ConditionFieldDateSelect = function (props) {
  return (
    <span>
      <Select
        size={props.size}
        style={props.style.col2}
        onChange={props.handleConditionChange}
        placeholder="Select operator"
      >

        <Option value="before">Before</Option>
        <Option value="after">After</Option>
        <Option value="equal">Equal to</Option>

      </Select>

      <Select
         size={props.size}
         value={props.metafieldValue}
         style={props.style.lastCol}
         onChange={props.handleMetafieldValueChange}
         placeholder="Select value"
      >
        <Option value="now">Now</Option>
      </Select>
    </span>
  );
};

export default ConditionFieldDateSelect;

