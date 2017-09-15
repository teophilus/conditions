import React, { Component } from 'react';
import { Form, Input, Select, Button } from 'antd';
import ConditionField from './ConditionField';
const FormItem = Form.Item;

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
    callback('Please select a Metadata field');
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <FormItem label="Condition">
          {getFieldDecorator('condition', {
            initialValue: { },
            rules: [{ validator: this.checkMetafield, required: true }],
          })(<ConditionField />)}
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
