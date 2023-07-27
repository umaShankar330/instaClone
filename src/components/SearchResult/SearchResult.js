import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import Posts from '../Home/Posts/Posts'
import './SearchResults.css'

class SearchResult extends Component {
  state = {postsDetails: [], status: 'LOADING'}

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    const {location} = this.props
    const {search} = location
    console.log(search, 'big id')
    const searchParams = new URLSearchParams(search)
    const id = searchParams.get('search')
    const {postsDetails, status} = this.state
    console.log(postsDetails, status)
    this.setState({status: 'LOADING'})
    const apiUrl = `https://apis.ccbp.in/insta-share/posts?search=${id}`
    const jwtToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhaHVsIiwicm9sZSI6IlBSSU1FX1VTRVIiLCJpYXQiOjE2MjMwNjU1MzJ9.D13s5wN3Oh59aa_qtXMo3Ec4wojOx0EZh8Xr5C5sRkU'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    console.log(response)
    if (response.ok) {
      const Data = await response.json()
      const responsePosts = Data.posts.map(each => ({
        postId: each.post_id,
        userId: each.user_id,
        userName: each.user_name,
        profilePic: each.profile_pic,
        comments: each.comments.map(item => ({
          CommentUserName: item.user_name,
          userId: item.user_id,
          comment: item.comment,
        })),
        createdAt: each.created_at,
        likesCount: each.likes_count,
        postDetails: {
          imageUrl: each.post_details.image_url,
          caption: each.post_details.caption,
        },
      }))
      if (responsePosts.length === 0) {
        this.setState({postsDetails: [], status: 'NOSEARCH'})
      } else {
        this.setState({postsDetails: responsePosts, status: 'SUCCESS'})
      }
      //   this.setState({postsDetails: responsePosts, status: 'SUCCESS'})
      console.log(responsePosts.length, 'search resppinse')
    }
  }

  renderPosts = () => {
    const {postsDetails} = this.state
    return (
      <ul>
        {postsDetails.map(each => (
          <Posts key={each.postId} post={each} />
        ))}
      </ul>
    )
  }

  renderNoSearch = () => (
    <div className="no-search-container">
      <img
        className="no-search-img"
        alt="search not found"
        src="https://res.cloudinary.com/dwux3vh4t/image/upload/v1690380372/Group_jrlyey.png"
      />
      <h1 className="no-search-title">Search Not Found</h1>
      <p className="no-search-para">Try different keyword or try again.</p>
    </div>
  )

  render() {
    const {status} = this.state
    console.log(status)
    return (
      <div className="results-container">
        {status === 'SUCCESS' && this.renderPosts()}
        {status === 'NOSEARCH' && this.renderNoSearch()}
      </div>
    )
  }
}

export default withRouter(SearchResult)
