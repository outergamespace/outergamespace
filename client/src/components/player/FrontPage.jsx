import React from 'react';

class FrontPage extends React.Component {
  constructor(props) {
    super();
    this.state = {
      // Style class states for animations
      loginText: '',
      guestText: '',
      registerText: '',
      registerTextTop: 'hidden',
      loginForm: 'hidden',
      guestTextTop: 'hidden',
      passwordField: 'hidden',
      mode: 'welcome',

      // form values
      username: '',
      password: '',
    }

    this.handleLogin = props.handleLogin;

    // function binding
    this.checkSubmit = this.checkSubmit.bind(this);
    this.setGuestView = this.setGuestView.bind(this);
    this.loginHandler = this.loginHandler.bind(this);
    this.setLoginView = this.setLoginView.bind(this);
    this.resetView = this.resetView.bind(this);
    this.setRegisterView = this.setRegisterView.bind(this);
  };

  setLoginView() {
    if (this.state.mode === 'welcome') {
      this.setState({
        mode: 'login',
        guestText: 'animated bounceOutRight',
        registerText: 'animated bounceOutRight',
        loginForm: 'animated bounceInLeft',
        passwordField: 'animated bounceInLeft'
      });
    } else if (this.state.mode === 'login') {
      this.resetView();
    }
  };

  checkSubmit(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.handleLogin(this.state.username, this.state.password);
    }
  }

  loginHandler(event) {
    const name = event.target.name;
    const input = event.target.value;
    this.setState({
      [name]: input
    });
  };

  setGuestView() {
    this.setState({
      mode: 'guest',
      loginText: 'animated bounceOutUp',
      guestText: 'animated bounceOutUp',
      guestTextTop: 'animated bounceInUp',
      loginForm: 'animated bounceInUp',
      registerText: 'animated bounceOutUp',
      passwordField: 'hidden'
    });
  };

  setRegisterView() {
    this.setState({
      mode: 'register',
      loginText: 'animated bounceOutUp',
      guestText: 'animated bounceOutUp',
      registerText: 'animated bounceOutUp',
      loginForm: 'animated bounceInUp',
      passwordField: 'animated bounceInUp',
      registerTextTop: 'animated bounceInUp'
    });
  };

  resetView() {
    if (this.state.mode === 'guest') {
      this.setState({
        guestTextTop: 'animated bounceOutRight',
        loginText: 'animated bounceInLeft'
      });
    }
    if (this.state.mode === 'register') {
      this.setState({
        registerTextTop: 'animated bounceOutRight',
        loginText: 'animated bounceInLeft'
      });
    }
    this.setState({
      mode: 'welcome',
      // loginText: 'animated bounceInLeft',
      guestText: 'animated bounceInLeft',
      registerText: 'animated bounceInLeft',
      loginForm: 'animated bounceOutRight'
    });
  };

  render() {
    return (
      <div className="frontpageBackground">
        <img className="marsBackground" src="../../mars.jpg" alt="mars"/>
        <h1 className="titleText">OuterGameSpace</h1>
        <h1 onClick={this.setLoginView} className={`loginText ${this.state.loginText}`}>Login</h1>
        <h1 onClick={this.resetView} className={`registerTextTop ${this.state.registerTextTop}`}>Register</h1>
        <h1 onClick={this.resetView} className={`guestTextTop ${this.state.guestTextTop}`}>Guest</h1>
        <h1 onClick={this.setGuestView} className={`guestText ${this.state.guestText}`}>Guest</h1>
        <h1 onClick={this.setRegisterView} className={`registerText ${this.state.registerText}`}>Register</h1>
        <form onSubmit={this.handleLogin} className={`loginForm ${this.state.loginForm}`}>
          <input 
            className="loginInput" 
            type="text" 
            name="username" 
            placeholder="username"
            onKeyDown={this.checkSubmit}
            onChange={this.loginHandler}
            value={this.state.username}>
          </input>
          <input 
            className={`loginInput ${this.state.passwordField}`}
            type="password" 
            name="password" 
            placeholder="password"
            onKeyDown={this.checkSubmit}
            onChange={this.loginHandler} 
            value={this.state.password}>
          </input>
        </form>
      </div>
    )
  }
}

export default FrontPage;


/*
guest button <--
  - float up to cover login
  - input field floats up to cover the guest field
*/