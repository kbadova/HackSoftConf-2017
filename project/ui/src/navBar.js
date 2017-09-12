import React from 'react';

export default function navBar() {
  return function(Child) {
    return class extends React.Component {
      constructor(props) {
        super(props);
      }
      render() {
        return (
          <div>
            <h2>NavBar Here</h2>
            <Child />
          </div>
        );
      }
    };
  };
}
