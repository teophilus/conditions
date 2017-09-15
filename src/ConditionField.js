import React, { Component } from 'react';
import { Form, Input, Select, Button } from 'antd';
import ConditionFieldDateSelect from './ConditionFieldDateSelect';
import ConditionFieldBooleanSelect from './ConditionFieldBooleanSelect';
const Option = Select.Option;


const style = {
  col: {
    width: '30%',
    marginRight: '3%',
  },
  lastCol: {
    width: '30%',
  }
}

const components = {
  Date: ConditionFieldDateSelect,
  Boolean: ConditionFieldBooleanSelect
};

class ConditionField extends Component {
  constructor(props) {
    super(props);

    const value = this.props.value || {};
    this.state = {
      metafield: value.metafield,
      condition: value.condition,
      metafieldValue: value.metafieldValue,
      metadataType: 'Date'
    };
  }

  componentWillReceiveProps(nextProps) {
    // Should be a controlled component.
    if ('value' in nextProps) {
      const value = nextProps.value;
      this.setState(value);
    }
  }
  
  handleMetafieldChange = (metafield) => {
    if (!('value' in this.props)) {
      this.setState({ metafield });
  }
  this.triggerChange({ metafield });
    console.log(this.state);
  }
  
  handleConditionChange = (condition) => {
    if (!('value' in this.props)) {
      this.setState({ condition });
    }
    this.triggerChange({ condition });
  }
  
  handleMetafieldValueChange = (metafieldValue) => {
    if (!('value' in this.props)) {
      this.setState({ metafieldValue });
    }
    this.triggerChange({ metafieldValue });
  }
  
  triggerChange = (changedValue) => {
    // Should provide an event to pass value to Form.
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(Object.assign({}, this.state, changedValue));
    }
  }
  
  render() {
    const { size } = this.props;
    const state = this.state;
    let metadataValueInput = null;
    let conditionOptions = null;

    const SelectForType = components[this.state.metadataType];
    
    return (
      <span>
        <Select
          size={size}
          value={state.metafield}
          onChange={this.handleMetafieldChange}
          style={style.col}
        >
          <Option value="foo">Foo</Option>
          <Option value="bar">Bar</Option>
        </Select>

        <SelectForType
          style={style}
          size={size}
          metafieldValue={this.state.metafieldValue}
          handleMetafieldValueChange={this.handleMetafieldValueChange}
          handleConditionChange={this.handleConditionChange}
        />
      </span>
    );
  }
}

export default ConditionField
