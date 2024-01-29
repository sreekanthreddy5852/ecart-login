import {Component} from 'react'
import './index.css'

class LoginForm extends Component {
  state = {
    name: '',
    password: '',
    isShowErr: false,
    errorMsg: '',
  }

  onSubmitSuccess = () => {
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({isShowErr: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {name, password} = this.state
    const userDetails = {name, password}
    const url = 'https://apis.ccbp.in/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      this.onSubmitSuccess()
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangeName = event => {
    this.setState({name: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderName() {
    const {name} = this.state
    return (
      <>
        <label className="label-text" htmlFor="name">
          USERNAME
        </label>
        <input
          type="text"
          className="input-text"
          id="name"
          placeholder="Username"
          value={name}
          onChange={this.onChangeName}
        />
      </>
    )
  }

  

  renderPassword() {
    const {password} = this.state
    return (
      <>
        <label className="label-text" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          className="input-text"
          id="password"
          placeholder="Password"
          value={password}
          onChange={this.onChangePassword}
        />
      </>
    )
  }

  render() {
    const {isShowErr, errorMsg} = this.state
    return (
      <div className="login-container">
        <img
          className="image"
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
          alt="website login"
        />
        <form className="form-container" onSubmit={this.submitForm}>
          <img
            className="logo"
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
            alt="website logo"
          />
          <div className="input-container">{this.renderName()}</div>
          <div className="input-container">{this.renderPassword()}</div>
          <button type="submit" className="login-button">
            Login
          </button>
          {isShowErr && <p className="error-msg">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}
export default LoginForm
