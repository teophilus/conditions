import React, { Component } from 'react';
import { Select } from 'antd';
const Option = Select.Option;

const ConditionFieldBooleanSelect = function (props) {
  return (
    <span>
      <Select
        size={props.size}
        style={props.style.col}
      >

        <Option value="equal">Equal to</Option>

      </Select>

      <Select
         size={props.size}
         value={props.metafieldValue}
         style={props.style.lastCol}
         onChange={props.onChange}
      >
         <Option value="true">True</Option>
         <Option value="false">False</Option>  
      </Select>
    </span>
  );
};

export default ConditionFieldBooleanSelect;
