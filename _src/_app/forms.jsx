import React from 'react';
import {Form, Field} from 'simple-react-forms';

export default class SimpleFormDemo extends React.Component {
  render () {
    let options = [{
      id: 'blr',
      label: 'Bangalore'
    }, {
      id: 'chn',
      label: 'Chennai'
    }];
    return (
    <div>
      <Form ref='simpleForm'>
          <Field
            name='city'
            label='Select City'
            element= {
              <Select
                options={options}
                valueAccessor={(selectedValue) => selectedValue.id}
              />
            }
          />
      </Form>
    </div>

    );
  }
}