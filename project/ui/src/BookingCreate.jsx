import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import {Cookies} from 'react-cookie';
import {Form, Input, Label, FormGroup} from 'reactstrap';
import VirtualizedSelect from 'react-virtualized-select';

import FormMixin from './FormMixin';
import './bookingCreate.scss';

class BookingCreate extends React.Component {
  constructor(props) {
    super(props);
    Object.assign(FormMixin, this);

    this.state = {
      bookingCreateForm: {
        csrfToken: new Cookies().get('csrftoken'),
        focusedDateInput: null,
        formErrors: [],
        fields: {
          room: {
            value: {},
            choices: [],
            errors: [],
            selectize: {
              value: 'id',
              label: 'number'
            }
          },
          start_date: {
            value: moment()
              .add(1, 'days')
              .format('YYYY-MM-DD'),
            errors: []
          },
          end_date: {
            value: moment()
              .add(2, 'days')
              .format('YYYY-MM-DD'),
            errors: []
          },
          tenant: {
            value: null,
            errors: [],
            choices: [],
            selectize: {
              value: 'id',
              label: 'number'
            }
          }
        }
      }
    };
  }

  render() {
    const tenant = this.state.bookingCreateForm.fields.tenant.value;
    const room = this.state.bookingCreateForm.fields.tenant.room;
    const tenantChoices = this.state.bookingCreateForm.fields.tenant.choices;
    const roomChoices = this.state.bookingCreateForm.fields.room.choices;
    const formErrors = this.state.bookingCreateForm.formErrors;

    return (
      <div>
        <Form>
          <FormGroup>
            {formErrors.map(error => (
              <span className="error-message">{error}</span>
            ))}
            <DatePicker />
            <DatePicker />

            <FormGroup>
              <Label className="control-label">ROOM</Label>
              <VirtualizedSelect
                options={roomChoices}
                placeholder={'Select an available room'}
                value={room}
                onChange={room =>
                  this.updateState('bookingCreateForm.fields.room.value', room)}
              />
              <span className="error-message">
                {this.state.bookingCreateForm.fields.room.errors}
              </span>
            </FormGroup>
            <FormGroup>
              <Label className="control-label">TENANT</Label>
              <VirtualizedSelect
                options={tenantChoices}
                placeholder={'Select a tenant'}
                value={tenant}
                onChange={tenant =>
                  this.updateState(
                    'bookingCreateForm.fields.tenant.value',
                    tenant
                  )}
              />
              <span className="error-message">
                {this.state.bookingCreateForm.fields.tenant.errors}
              </span>
            </FormGroup>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

ReactDOM.render(
  <BookingCreate />,
  document.getElementById('booking-create-form-id')
);
