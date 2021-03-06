import React, { Component } from 'react';
import axios from 'axios';

export default class Signup extends Component {

  constructor(props) {
      super(props);
      this.state = {
          username: '',
          password: '',
          race: '',
      };
  }  

  handleChange = e => {
      this.setState({ [e.target.name] : e.target.value });
  }  

  submitHandler = e => {
    e.preventDefault();
    const { username, password, race } = this.state;
    axios
      .post('http://localhost:5500/api/auth/register', { username, password, race })
      .then(response => {
        console.log(response.data);
        console.log(response);
        if (response.data.username && response.data.token) {
          localStorage.setItem('jwt', response.data.token);
          console.log('signing props', this.props);
          this.props.history.push('/users');
        } else {
          console.log('problem')
        }
      })
      .catch(error => {
        console.error('Server Error', error);
      });
  }

  render() {
    return (
      <div>
        <form>
            <h1>Sign Up for... </h1>
            <h2>Username:</h2>
            <input name="username" onChange={this.handleChange} value={this.state.username} /> 
            <h2>Password:</h2>
            <input name="password" onChange={this.handleChange} value={this.state.password} />
            <h2>Race:</h2>
            <input name="race" onChange={this.handleChange} value={this.state.race} />
        </form><br></br>
        <button type="submit" onClick={this.submitHandler}><h3>Sign Up</h3></button>
      </div>
    )
  }
}
