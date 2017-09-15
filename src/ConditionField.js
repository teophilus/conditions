import React, { Component } from 'react';
import { Select } from 'antd';
const Option = Select.Option;

const style = {
  col: {
    width: '29%',
    marginRight: '3%',
  },
  lastCol: {
    width: '29%',
    marginRight: '3%',
  }
}

class ConditionField extends Component {
  constructor(props) {
    super(props);

    const value = this.props.value || {};
    this.state = {
      metafield: value.metafield,
      condition: value.condition,
      metafieldValue: value.metafieldValue,
      metadataType: 'Date',
      conditionOptions: []
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
    
    switch (this.state.metadataType) {
      case 'Text':
      break;
      case 'Date':
        conditionOptions = <Select
          style={style.col}
          size={size}
        >
          <Option value="before">Before</Option>
          <Option value="after">After</Option>
          <Option value="equal">Equal to</Option>
        </Select>

        metadataValueInput = <Select
          size={size}
          value={state.metafieldValue}
          style={style.lastCol}
          onChange={this.handleMetafieldValueChange}
          >
            <Option value="">Now</Option>
        </Select>
      break;
      case 'Numeric':
      break;
      case 'Dropdown':
      break;
      case 'Long Text':
      break;
      case 'Boolean':
        conditionOptions = <Select
          style={style.col}
          size={size}
        >
          <Option value="equal">Equal to</Option>
        </Select>

        metadataValueInput = <Select
          size={size}
          value={state.metafieldValue}
          style={style.lastCol}
          onChange={this.handleMetafieldValueChange}
        >
          <Option value="true">True</Option>
          <Option value="false">False</Option>  
        </Select>
      break;
      default:
    }
    
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
        {conditionOptions}
        {metadataValueInput}
      </span>
    );
  }
}

export default ConditionField
