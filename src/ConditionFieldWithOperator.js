import React, { Component } from 'react';
import { Radio, Icon, Row } from 'antd';
import ConditionField from './ConditionField';

class ConditionFieldWithOperator extends Component {

  constructor(props) {
    super(props);
  }
    
  render() {

    return (
      <Row align="bottom">
        <span
          style={{
            textAlign: 'center',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            position: 'absolute',
            bottom: '50px',
          }}>
        <Radio.Group
          defaultValue="and"
          size="small"
        >
          <Radio.Button value="and">AND</Radio.Button>
          <Radio.Button value="or">OR</Radio.Button>
        </Radio.Group>
        </span>
        <ConditionField />
        {this.props.keys.length > 0 ? (
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            disabled={this.props.keys.length === 0}
            onClick={() => this.props.remove(this.props.k)}
          />
        ) : null}
      </Row>
    );
  }

}

export default ConditionFieldWithOperator;