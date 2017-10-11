import React from 'react';

class FrontPage extends React.Component {
  constructor(props) {
    super();
    this.state = {
      // Style class states for animations
      loginText: '',
      guestText: '',
      registerText: '',
      loginForm: 'hidden',

      // form values
      username: '',
      password: ''
    }

    // function binding
    this.loginHandler = this.loginHandler.bind(this);
    this.setLoginView = this.setLoginView.bind(this);
  }

  setLoginView() {
    this.setState({
      guestText: 'animated bounceOutRight',
      registerText: 'animated bounceOutRight',
      loginForm: 'animated bounceInLeft'
    })
  }

  loginHandler(event) {
    const name = event.target.name;
    const input = event.target.value;
    this.setState({
      [name]: input
    })
  }

  render() {
    return (
      <div className="frontpageBackground">
        <img className="marsBackground" src="../../mars.jpg" alt="mars"/>
        <h1 className="titleText">OuterGameSpace</h1>
        <h1 onClick={this.setLoginView} className={`loginText ${this.state.loginText}`}>Login</h1>
        <h1 className={`guestText ${this.state.guestText}`}>Guest</h1>
        <h1 className={`registerText ${this.state.registerText}`}>Register</h1>
        <form className={`loginForm ${this.state.loginForm}`}>
          <input 
            className="loginInput" 
            type="text" 
            name="username" 
            placeholder="username" 
            onChange={this.loginHandler}
            value={this.state.username}>
          </input>
          <input 
            className="loginInput" 
            type="password" 
            name="password" 
            placeholder="password"
            onChange={this.loginHandler} 
            value={this.state.password}>
          </input>
        </form>
      </div>
    )
  }
}

export default FrontPage;


// Login triggers
//   Guest fadeout
//     Username fadein
//   Register fadeout
//     Password fadein