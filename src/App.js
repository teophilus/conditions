import React, { Component } from 'react';
import { Form, Button, Icon, Row } from 'antd';
import ConditionField from './ConditionField';
const FormItem = Form.Item;

let uuid = 0;
class Demo extends Component {
  
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  checkMetafield = (rule, value, callback) => {
    if (value.metafield != null) {
      callback();
      return;
    }
    callback('Please select a metadata field');
  }

  checkOperatorField = (rule, value, callback) => {
    if (value.condition != null) {
      callback();
      return;
    }
    callback('Please select a operator');
  }

  remove = (k) => {
    uuid--;
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    if (keys.length === 0) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  }
  
  add = () => {
    uuid++;
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(uuid);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
  }

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 5, offset: 5 },
        md: { span: 5, offset: 5 },
      },
    };

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
        md: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 17 },
        md: { span: 17 },
      },
    };

    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
    const formItems = keys.map((k, index) => {
      return (
        <FormItem
          {...(formItemLayout)}
          label={`Condition`}
          required={false}
          key={k}
          style={{ paddingTop: 50 }}
        >
          {getFieldDecorator(`condition-${k}`, {
            initialValue: { },
            rules: [{ exclusive: true, validator: this.checkMetafield, validator: this.checkOperatorField, required: true }],
          })(<ConditionField k={k} />)}
        </FormItem>
      );
    });

    return (
      <Form onSubmit={this.handleSubmit}>
        
        <FormItem
          {...formItemLayout}
          label="Condition"
          required={false}
        >
          {getFieldDecorator('condition', {
            initialValue: { },
            rules: [{ validator: this.checkMetafield, validator: this.checkOperatorField, required: true }],
          })(<ConditionField />)}
        </FormItem>

        {formItems}

        <FormItem
          {...formItemLayoutWithOutLabel}
          style={{ textAlign: 'center' }}
        >
          <Button type="dashed" onClick={this.add} style={{ width: '30%', cursor: 'pointer' }}>
            <Icon type="plus" /> Add Condition
          </Button>
        </FormItem>

        <FormItem>
          <Button type="primary" htmlType="submit">Submit</Button>
        </FormItem>
      </Form>
    );
  }
}

const App = Form.create()(Demo);
export default App;
