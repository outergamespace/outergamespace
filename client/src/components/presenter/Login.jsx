import React from 'react';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
    };
  }
  render() {
    return (
      <div>
        <h1>Login Page</h1>
        <input type="text" placeholder="Please enter your Username" />
        <input type="text" placeholder="Please enter your Password" />
      </div>
    );
  }
}

export default Login;
