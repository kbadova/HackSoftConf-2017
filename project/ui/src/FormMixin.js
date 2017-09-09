import _ from 'lodash';

const FormMixin = {
  updateState(path, value, cb) {
    this.setState(function(prevState) {
      let paths_list = this.parsePath(path);

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
  }
};
export default FormMixin;
