import React, { Component } from 'react';
import { Select, Row, Radio } from 'antd';
import ConditionFieldDateSelect from './ConditionFieldDateSelect';
import ConditionFieldBooleanSelect from './ConditionFieldBooleanSelect';
const Option = Select.Option;


const style = {
  col: {
    width: '34%',
    marginRight: '3%',
  },
  col2: {
    width: '26%',
    marginRight: '3%',
  },
  lastCol: {
    width: '29%',
    marginRight: '3%',
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
      andOr: value.andOr,
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

  handleAndOrChange = (andOr) => {
    if (!('value' in this.props)) {
      this.setState({ andOr });
    }
    this.triggerChange({ andOr });
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
      <Row align="bottom">
        <span
          style={
            (this.props.k > 0) ? {
            textAlign: 'center',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            position: 'absolute',
            bottom: '55px',
          } : null}
        >
          {this.props.k > 0 &&
            <Radio.Group
              size="small"
              defaultValue="and"
              value={state.andOr}
              onChange={this.handleAndOrChange}
            >
              <Radio.Button value="and">AND</Radio.Button>
              <Radio.Button value="or">OR</Radio.Button>
            </Radio.Group>
          }
        </span>
          <Select
            size={size}
            value={state.metafield}
            onChange={this.handleMetafieldChange}
            style={style.col}
            placeholder="Select metadata field"
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
      </Row>
    );
  }
}

export default ConditionField
