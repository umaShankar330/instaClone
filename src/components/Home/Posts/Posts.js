import {Component} from 'react'
import {BsHeart} from 'react-icons/bs'

import {FaRegComment} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'
import {FcLike} from 'react-icons/fc'
import {Link} from 'react-router-dom'
import './post.css'

class Posts extends Component {
  state = {isLike: false}

  toggleLike = id => {
    this.getLikeStatus(id)
    console.log('triggered')
  }

  getLikeStatus = async id => {
    const {isLike} = this.state
    const url = `https://apis.ccbp.in/insta-share/posts/${id}/like`
    const jwtToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhaHVsIiwicm9sZSI6IlBSSU1FX1VTRVIiLCJpYXQiOjE2MjMwNjU1MzJ9.D13s5wN3Oh59aa_qtXMo3Ec4wojOx0EZh8Xr5C5sRkU'
    const option = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({like_status: !isLike}),
    }
    const response = await fetch(url, option)
    const jsonResponse = await response.json()
    this.setState(prevState => ({isLike: !prevState.isLike}))
    console.log(jsonResponse, 'idd')
  }

  //   renderUser = () => {}

  // https://apis.ccbp.in/insta-share/posts/{postId}/like

  render() {
    const {post} = this.props
    const {isLike} = this.state

    const {
      userId,
      profilePic,
      postId,
      userName,
      postDetails,
      comments,
      createdAt,
      likesCount,
    } = post
    const {imageUrl, caption} = postDetails
    console.log(userId, caption, postId)
    console.log(userId, 'userId')
    return (
      <li key={postId} className="PostContainer">
        <div className="TopContainer">
          <img
            className="ProfilePic"
            alt="post author profile"
            src={profilePic}
          />
          <Link className="link" to={`/users/${userId}`}>
            <p onClick={this.renderUser} className="Username">
              {userName}
            </p>
          </Link>
        </div>
        <img className="PostImage" src={imageUrl} alt="post" />
        <div className="BottomSection">
          <div className="IconsContainer">
            <button
              type="button"
              className="IconBtn"
              onClick={() => this.toggleLike(postId)}
            >
              {isLike ? (
                <FcLike className="liked" data-testid="likeIcon" />
              ) : (
                <BsHeart className="like-img" data-testid="unLikeIcon" />
              )}
            </button>
            <button type="button" className="IconBtn">
              <FaRegComment />
            </button>
            <button type="button" className="IconBtn">
              <BiShareAlt />
            </button>
          </div>
          <h4 className="CommentUser">
            {isLike ? parseInt(likesCount) + 1 : likesCount} likes
          </h4>
          <p className="Caption">{caption}</p>
          <ul className="CommentsSection">
            {comments.map(each => {
              const {CommentUserName, comment} = each
              return (
                <li className="CommentRow">
                  <h4 className="CommentUser">{CommentUserName}</h4>
                  <p className="CommentPara">{comment}</p>
                </li>
              )
            })}
          </ul>
          <p className="Time">{createdAt}</p>
        </div>
      </li>
    )
  }
}

export default Posts
