import React from 'react';
//import /*component name*/ from './childname.jsx'; if needed

class Join extends React.Component {
  constructor(props) {
    super(props);
    // state
  }
  render() {
    return (
      <div>
        <div>
          <label htmlFor="">Choose a name: <input type="text" /></label>
        </div>
        <div>  
          <button>JOIN</button>
        </div>
      </div>
    );
  }
}

export default Join;