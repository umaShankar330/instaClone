import {Component} from 'react'

import Profile from '../Profile/profile'
import './MyProfile.css'

class MyProfile extends Component {
  state = {profileDetails: [], status: 'LOADING'}

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    const {profileDetails, status} = this.state
    console.log(profileDetails, status)
    this.setState({status: 'LOADING'})
    const apiUrl = 'https://apis.ccbp.in/insta-share/my-profile'
    const jwtToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhaHVsIiwicm9sZSI6IlBSSU1FX1VTRVIiLCJpYXQiOjE2MjMwNjU1MzJ9.D13s5wN3Oh59aa_qtXMo3Ec4wojOx0EZh8Xr5C5sRkU'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const jsonResponse = await response.json()
      const responseProfile = jsonResponse.profile
      const modifiedProfile = {
        followersCount: responseProfile.followers_count,
        followingCount: responseProfile.following_count,
        id: responseProfile.id,
        posts: responseProfile.posts,
        postsCount: responseProfile.posts_count,
        profilePic: responseProfile.profile_pic,
        stories: responseProfile.stories,
        userBio: responseProfile.user_bio,
        userId: responseProfile.user_id,
        userName: responseProfile.user_name,
      }
      this.setState({profileDetails: modifiedProfile, status: 'SUCCESS'})
      console.log(modifiedProfile)
    }
  }

  getProfile = () => {
    const {profileDetails} = this.state
    return (
      <Profile
        details={profileDetails}
        altProfile="my profile"
        altStory="my story"
        altPost="my post"
      />
    )
  }
  //

  loading = () => (
    <div className="loading">
      <img
        className="img-load"
        src="https://res.cloudinary.com/dwux3vh4t/image/upload/v1690379654/Loading_eiragq.svg"
        alt="loading-img"
      />
    </div>
  )

  render() {
    const {status} = this.state
    return (
      <div>
        {status === 'SUCCESS' && this.getProfile()}
        {status === 'LOADING' && this.loading()}
      </div>
    )
  }
}

export default MyProfile
