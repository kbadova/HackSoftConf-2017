import _ from 'lodash';

const FormMixin = {
  updateState(path, value, cb) {
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
    }, cb);
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
  }
};
export default FormMixin;
