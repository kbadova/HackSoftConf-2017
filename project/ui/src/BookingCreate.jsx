import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import {Cookies} from 'react-cookie';
import {Form, Input, Label, FormGroup, Button} from 'reactstrap';
import VirtualizedSelect from 'react-virtualized-select';
import FormMixin from './FormMixin';

import navBar from './navBar';
import {roomService} from './roomService';
import {tenantService} from './tenantService';
import {bookingService} from './bookingService';

import './bookingCreate.scss';

// @navBar()
class BookingCreate extends React.Component {
  constructor(props) {
    super(props);
    Object.assign(this, FormMixin);

    this.state = {
      bookingCreateForm: {
        csrfToken: new Cookies().get('csrftoken'),
        focusedDateInput: null,
        formErrors: [],
        fields: {
          room: {
            value: '',
            choices: [],
            errors: [],
            selectize: {
              value: 'id',
              label: 'room_number'
            }
          },
          tenant: {
            value: '',
            errors: [],
            choices: [],
            selectize: {
              value: 'id',
              label: 'email'
            }
          }
        }
      }
    };
  }
  fetchRooms() {
    roomService
      .fetchRooms()
      .then(data =>
        this.updateSelectizeChoices(
          'bookingCreateForm.fields.room.choices',
          data
        )
      );
  }

  fetchTenants(params) {
    tenantService
      .fetchTenants(params)
      .then(data =>
        this.updateSelectizeChoices(
          'bookingCreateForm.fields.tenant.choices',
          data
        )
      );
  }

  handlePost = () => {
    const data = this.getFormFieldValues('bookingCreateForm');
    const params = {
      csrfToken: this.state.bookingCreateForm.csrfToken,
      data: data
    };
    bookingService
      .createBooking(params)
      .then(() => console.log('Created'))
      .catch(err => {
        this.handleError(err.response, 'bookingCreateForm');
      });
  };
  componentDidMount() {
    this.fetchRooms();
    this.fetchTenants();
  }

  render() {
    const tenant = this.state.bookingCreateForm.fields.tenant.value;
    const tenantChoices = this.state.bookingCreateForm.fields.tenant.choices;
    const room = this.state.bookingCreateForm.fields.room.value;
    const roomChoices = this.state.bookingCreateForm.fields.room.choices;
    const formErrors = this.state.bookingCreateForm.formErrors;

    return (
      <div>
        <Form className="form box-shadow overflow-visible">
          <h2>Booking Create Form</h2>
          {formErrors.map(error => (
            <span className="error-message">{error}</span>
          ))}

          <FormGroup>
            <Label className="control-label">ROOM</Label>
            <VirtualizedSelect
              options={roomChoices}
              placeholder="Select a room"
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
              placeholder="Select a tenant"
              value={tenant}
              onChange={tenant =>
                this.updateState(
                  'bookingCreateForm.fields.tenant.value',
                  tenant
                )}
              onInputChange={query => {
                this.fetchTenants(query);
              }}
            />
            <span className="error-message">
              {this.state.bookingCreateForm.fields.tenant.errors}
            </span>
          </FormGroup>
          <Button onClick={this.handlePost}>Submit</Button>
        </Form>
      </div>
    );
  }
}
ReactDOM.render(
  <BookingCreate />,
  document.getElementById('booking-create-form-id')
);
