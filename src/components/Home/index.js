import {Component} from 'react'
import Slider from 'react-slick'
import Loader from 'react-loader-spinner'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Stories from './Stories/stories'
import Posts from './Posts/Posts'
import './home.css'

function SampleNextArrow(props) {
  const {className, style, onClick} = props
  return (
    <button
      type="button"
      className={className}
      style={{...style, display: 'block'}}
      onClick={onClick}
    >
      k
    </button>
  )
}

function SamplePrevArrow(props) {
  const {className, style, onClick} = props
  return (
    <button
      type="button"
      className={className}
      style={{
        ...style,
        display: 'block',
      }}
      onClick={onClick}
    >
      k
    </button>
  )
}

class Home extends Component {
  state = {
    storiesStatus: 'LOADING',
    stories: [],
    postStatus: 'LOADING',
    postList: [],
  }

  componentDidMount() {
    this.getStoriesDetails()
    this.getPostDetails()
  }
  // https://apis.ccbp.in/insta-share/post

  getStoriesDetails = async () => {
    const {stories, postList} = this.state
    console.log(stories, postList)
    this.setState({storiesStatus: 'LOADING'})
    const url = 'https://apis.ccbp.in/insta-share/stories'
    const jwtToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhaHVsIiwicm9sZSI6IlBSSU1FX1VTRVIiLCJpYXQiOjE2MjMwNjU1MzJ9.D13s5wN3Oh59aa_qtXMo3Ec4wojOx0EZh8Xr5C5sRkU'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const apiData = await fetch(url, options)
    if (apiData.ok) {
      const Data = await apiData.json()
      const storiesList = Data.users_stories.map(each => ({
        userId: each.user_id,
        storyUrl: each.story_url,
        userName: each.user_name,
      }))
      this.setState({stories: storiesList, storiesStatus: 'SUCCESS'})
      console.log(storiesList)
    } else {
      this.setState({stories: [], storiesStatus: 'FAILURE'})
    }
    // console.log(apiData)
  }

  getPostDetails = async () => {
    this.setState({postStatus: 'LOADING'})
    const url = 'https://apis.ccbp.in/insta-share/posts'
    const jwtToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhaHVsIiwicm9sZSI6IlBSSU1FX1VTRVIiLCJpYXQiOjE2MjMwNjU1MzJ9.D13s5wN3Oh59aa_qtXMo3Ec4wojOx0EZh8Xr5C5sRkU'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const apiData = await fetch(url, options)

    if (apiData.ok) {
      const Data = await apiData.json()
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
      this.setState({postList: responsePosts, postStatus: 'SUCCESS'})
    } else {
      this.setState({postList: [], postStatus: 'FAILURE'})
    }
  }

  renderStories = () => {
    const {stories} = this.state
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 6,
      slidesToScroll: 1,

      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
    }
    return (
      <ul className="stories-list">
        <Slider className="slider" {...settings}>
          {stories.map(each => (
            <Stories key={each.userId} list={each} />
          ))}
        </Slider>
      </ul>
    )
  }

  renderFailureStories = () => (
    <div className="stories-container slider">
      <img
        className="errorImg"
        alt="alertImg"
        src="https://res.cloudinary.com/dwux3vh4t/image/upload/v1690391415/alert-triangle_v2c5ys.png"
      />
      <p className="error-text">Something went wrong. Please try again</p>
      <button
        onClick={this.getStoriesDetails}
        className="error-btn"
        type="button"
      >
        Try again
      </button>
    </div>
  )

  renderStoriesLoading = () => (
    <div className="stories-container slider">
      <div className="loader-container" data-testid="loader">
        <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
      </div>
    </div>
  )

  renderPosts = () => {
    const {postList} = this.state
    return (
      <ul className="PostDiv">
        {postList.map(each => (
          <Posts key={each.postId} post={each} />
        ))}
      </ul>
    )
  }

  renderFailurePosts = () => (
    <div className="posts-failure">
      <img
        className="errorImg"
        alt="alertImg"
        src="https://res.cloudinary.com/dwux3vh4t/image/upload/v1690391415/alert-triangle_v2c5ys.png"
      />
      <p className="error-text">Something went wrong. Please try again</p>
      <button onClick={this.getPostDetails} className="error-btn" type="button">
        Try again
      </button>
    </div>
  )

  renderPostsLoading = () => (
    <div className="posts-failure">
      <div className="loader-container" data-testid="loader">
        <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
      </div>
    </div>
  )

  render() {
    const {storiesStatus, postStatus} = this.state
    console.log(storiesStatus)
    return (
      <div className="MainPage">
        <div className="StoriesDiv">
          {storiesStatus === 'SUCCESS' && this.renderStories()}
          {storiesStatus === 'FAILURE' && this.renderFailureStories()}
          {storiesStatus === 'LOADING' && this.renderStoriesLoading()}
        </div>
        {postStatus === 'SUCCESS' && this.renderPosts()}
        {postStatus === 'FAILURE' && this.renderFailurePosts()}
        {postStatus === 'LOADING' && this.renderPostsLoading()}
      </div>
    )
  }
}

export default Home
