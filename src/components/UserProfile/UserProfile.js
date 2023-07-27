import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import Profile from '../Profile/profile'
// import { prop } from 'cheerio/lib/api/attributes'

class UserProfile extends Component {
  state = {profileDetails: [], status: 'LOADING'}

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const {profileDetails, status} = this.state
    console.log(profileDetails, status)
    this.setState({status: 'LOADING'})
    const apiUrl = `https://apis.ccbp.in/insta-share/users/${id}`

    // const apiUrl = `https://apis.ccbp.in/insta-share/users/Arjun_Mark`
    const jwtToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhaHVsIiwicm9sZSI6IlBSSU1FX1VTRVIiLCJpYXQiOjE2MjMwNjU1MzJ9.D13s5wN3Oh59aa_qtXMo3Ec4wojOx0EZh8Xr5C5sRkU'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    // const jsonResponse = await response.json()
    console.log(response, 'response')
    if (response.ok) {
      const jsonResponse = await response.json()
      console.log(jsonResponse, 'response')
      const responseProfile = jsonResponse.user_details
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
      //   console.log(modifiedProfile, 'userId')
    }
  }

  getProfile = () => {
    const {profileDetails} = this.state
    // console.log(profileDetails)
    return (
      <Profile
        details={profileDetails}
        altProfile="user profile"
        altStory="user story"
        altPost="user post"
      />
    )
  }

  render() {
    const {status} = this.state
    return <div>{status === 'SUCCESS' && this.getProfile()}</div>
  }
}

export default withRouter(UserProfile)
