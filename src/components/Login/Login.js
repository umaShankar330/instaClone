import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './Login.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    isPwd: false,
    isLogin: true,
  }

  getLoginDetails = async () => {
    this.setState({isLogin: true})
    const {username, password} = this.state

    const userDetails = {username, password}

    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const sendDetails = await fetch(apiUrl, options)
    console.log(sendDetails)
    if (sendDetails.ok) {
      const requestToken = await sendDetails.json()
      console.log(requestToken)
      Cookies.set('jwt_token', requestToken.jwt_token, {
        expires: 30,
        path: '/',
      })
      const {history} = this.props
      history.replace('/')
    } else {
      this.setState({isLogin: false})
    }
  }

  triggerLogin = event => {
    event.preventDefault()
    this.getLoginDetails()
  }

  changeName = event => {
    this.setState({username: event.target.value})
  }

  changePwd = event => {
    this.setState({password: event.target.value})
  }

  toggleShowPwd = () => {
    this.setState(prevState => ({isPwd: !prevState.isPwd}))
  }

  render() {
    const {username, password, isLogin, isPwd} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    console.log(isLogin, password)
    return (
      <div className="PageContainer">
        <img
          className="ImageCard"
          alt="website login"
          src="https://res.cloudinary.com/dwux3vh4t/image/upload/v1689873781/Layer_2_cirtfh.png"
        />
        <div className="LoginCard">
          <img
            className="WebsiteLogo"
            src="https://res.cloudinary.com/dwux3vh4t/image/upload/v1689847331/insta%20share%20logo.png"
            alt="website logo"
          />
          <form className="FormContainer" onSubmit={this.triggerLogin}>
            <div className="LabelContainer">
              <p className="LabelText" htmlFor="user-name">
                USERNAME
              </p>
              <input
                className="InputText"
                onChange={this.changeName}
                type="text"
                placeholder="Username"
                id="user-name"
                value={username}
              />
            </div>
            <div className="LabelContainer">
              <p className="LabelText" htmlFor="user-pwd">
                PASSWORD
              </p>
              <input
                className="InputText"
                onChange={this.changePwd}
                type={isPwd ? 'text' : 'password'}
                placeholder="Password"
                id="user-pwd"
                value={password}
              />
              {isLogin ? null : (
                <p className="AlertMessage">
                  *Username and Password didn&apos;t match
                </p>
              )}
            </div>

            <div className="ShowPwdContainer">
              <input
                id="showPwd"
                type="checkbox"
                onClick={this.toggleShowPwd}
              />
              <p className="LabelText" htmlFor="showPwd">
                Show Password
              </p>
            </div>

            <button className="LoginBtn" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    )
    //     }}
    //   </SavedContext.Consumer>
    // )
  }
}

export default Login
