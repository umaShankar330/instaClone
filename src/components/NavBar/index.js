import {Component} from 'react'
import Popup from 'reactjs-popup'
import {FaSearch} from 'react-icons/fa'
import {VscThreeBars} from 'react-icons/vsc'
import {withRouter, Link} from 'react-router-dom'
import {AiOutlineClose} from 'react-icons/ai'
import Cookies from 'js-cookie'
import {IoExitOutline} from 'react-icons/io5'
// import SavedContext from '../../Context'
// import ItemSection from '../ItemsSection'
import './index.css'

class Navbar extends Component {
  state = {isCollapse: false, searchText: ''}

  toggleCollapse = () => {
    this.setState(prevState => ({isCollapse: !prevState.isCollapse}))
  }

  triggerSearch = () => {
    const {searchText} = this.state
    const {history} = this.props
    history.replace(`/posts?search=${searchText}`)
  }

  changeSearchText = event => {
    this.setState({searchText: event.target.value})
  }

  render() {
    const {isCollapse, searchText} = this.state

    const logoutUser = () => {
      console.log('trigger')
      Cookies.remove('jwt_token')
      const {history} = this.props
      history.replace('/login')
    }

    return (
      <div className="NavSectionContainer">
        <nav className="NavBarContainer">
          <Link className="link" to="/">
            <div className="LogoContainer">
              <img
                className="NavLogo"
                src="https://res.cloudinary.com/dwux3vh4t/image/upload/v1689847331/insta%20share%20logo.png"
                alt="website logo"
              />
              <p className="LogoTitle">Insta Share</p>
            </div>
          </Link>

          <div className="NavItems">
            <div className="SearchContainer">
              <input
                className="SearchInput"
                placeholder="Search Caption"
                onChange={this.changeSearchText}
                type="search"
                value={searchText}
              />

              <button
                className="SearchBtn"
                onClick={this.triggerSearch}
                type="button"
                data-testid="searchIcon"
              >
                <FaSearch />
              </button>
            </div>

            <button
              type="button"
              className="ExitIcon"
              onClick={this.toggleCollapse}
            >
              {isCollapse ? <AiOutlineClose /> : <VscThreeBars />}
            </button>
            <Link className="link" to="/">
              <p className="link-text">Home</p>
            </Link>
            <Link className="link" to="/my-profile">
              <p className="link-text">Profile</p>
            </Link>
            <Popup
              modal
              trigger={
                <div className="ExitBtn">
                  <button type="button" className="LogoutBtn">
                    Logout
                  </button>
                  <button className="logoutIcon" type="button">
                    <IoExitOutline />
                  </button>
                </div>
              }
            >
              {close => (
                <div className="PopupContainer">
                  <div>
                    <p className="PopupText">
                      Are you sure, you want to logout
                    </p>
                  </div>
                  <div className="PopupBtnContainer">
                    <button
                      type="button"
                      className="CloseBtn"
                      onClick={() => close()}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="ConfirmBtn"
                      onClick={logoutUser}
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              )}
            </Popup>
          </div>
        </nav>
      </div>
    )
  }
}

export default withRouter(Navbar)
