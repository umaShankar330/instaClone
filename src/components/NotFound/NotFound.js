import {withRouter} from 'react-router-dom'

import './NotFound.css'

const NotFound = props => {
  const goToHome = () => {
    const {history} = props
    history.replace('/')
  }
  return (
    <div className="not-found-section">
      <img
        className="not-found-img"
        alt="page not found"
        src="https://res.cloudinary.com/dwux3vh4t/image/upload/v1690380381/Group_1_gkti6y.png "
      />
      <h1 className="title">Page Not Found</h1>
      <p className="not-found-para">
        we are sorry, the page you requested could not be found. Please go back
        to the homepage.
      </p>
      <button onClick={goToHome} className="home-btn" type="button">
        HomePage
      </button>
    </div>
  )
}

export default withRouter(NotFound)
