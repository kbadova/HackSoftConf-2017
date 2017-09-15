import _ from 'lodash';

const FormMixin = {
  updateState(path, value) {
    this.setState(function(prevState) {
      let paths_list = path.split('.');

      if (paths_list.length < 1) {
        return;
      }
      let keyToBeUpdated = paths_list.pop();

      _.range(paths_list.length).forEach(function(index) {
        let key = paths_list[index];

        if (key in prevState) {
          prevState = prevState[key];
        } else {
          throw `Your key ${key} is not in state`;
        }
      });
      prevState[keyToBeUpdated] = value;
    });
  },

  getStateFieldValue(path) {
    let state = this.state;
    let paths_list = path.split('.');

    if (paths_list.length < 1) {
      return;
    }
    _.range(paths_list.length).forEach(function(index) {
      let key = paths_list[index];

      if (key in state) {
        state = state[key];
      } else {
        throw `Your key ${key} is not in state`;
      }
    });

    return state;
  },

  updateSelectizeChoices(path, data) {
    let splittedPath = path.split('.');
    splittedPath.pop(); // Remove 'choices'

    // Get path to field
    let pathToField = splittedPath.join('.');

    // Get selectize attrs from state
    let selectizeValue = this.getStateFieldValue(
      pathToField + '.selectize.value'
    );
    let selectizeLabel = this.getStateFieldValue(
      pathToField + '.selectize.label'
    );

    let choices = data.map(obj => {
      return {
        value: obj[selectizeValue],
        label: obj[selectizeLabel],
        payload: obj
      };
    });
    this.updateState(path, choices);
  },

  handleError(response, formName) {
    let data = response.data;
    let formErrorsPath = formName + '.formErrors';
    if (response.status == 404) {
      return this.updateState(formErrorsPath, [
        response.data.errors[0].message
      ]);
    }
    if (data && data.errors) {
      this.setFormErrors(this, data.errors, formName);
    } else {
      this.updateState(formErrorsPath, [response.statusText]);
    }
  },

  setStateErrors(obj, nonFieldErrorsMessages, fieldErrors, formName) {
    obj.setState(prevState => {
      prevState[formName]['formErrors'] = nonFieldErrorsMessages;

      Object.keys(prevState[formName].fields).forEach(key => {
        prevState[formName].fields[key].errors = [];
      });
      fieldErrors.forEach(error => {
        if (prevState[formName].fields[error.field]) {
          prevState[formName].fields[error.field].errors.push(error.message);
        }
      });
      return prevState;
    });
  },

  setFormErrors(obj, errors, formName) {
    let nonFieldErrorsMessages = errors
      .filter(error => !error.field || error.field == '__all__')
      .map(error => error.message);
    let fieldErrors = errors.filter(error => error.field);

    this.setStateErrors(obj, nonFieldErrorsMessages, fieldErrors, formName);
  },
  getFormFieldValues(formName) {
    let formFields = this.state[formName].fields;

    let fieldValues = Object.keys(formFields).reduce((acc, key) => {
      let value = formFields[key].value;

      if (value !== null && typeof value === 'object') {
        value = value.value;
      }
      acc[key] = value;

      return acc;
    }, {});
    return fieldValues;
  }
};
export default FormMixin;
