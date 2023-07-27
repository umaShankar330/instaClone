import {BsGrid3X3} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'
import './profile.css'

const Profile = props => {
  const {details, altProfile, altStory, altPost} = props
  const {
    followersCount,
    followingCount,
    posts,
    postsCount,
    profilePic,
    stories,
    userBio,
    userId,
    userName,
  } = details
  console.log(stories, 'stories')
  return (
    <div className="main-container">
      <div className="top-container">
        <img className="profile-icon" src={profilePic} alt={altProfile} />
        <div className="profile-details">
          <p className="user-name">{userName}</p>
          <div className="count-container">
            <p className="count">
              <span className="count-title">{postsCount}</span>posts
            </p>
            <p className="count">
              <span className="count-title">{followersCount}</span>followers
            </p>
            <p className="count">
              <span className="count-title">{followingCount}</span>following
            </p>
          </div>
          <h4 className="user-id">{userId}</h4>
          <p className="bio">{userBio}</p>
        </div>
      </div>
      <ul className="middle-container">
        {stories.map(each => {
          const {id, image} = each
          return (
            <li key={id} className="stories-list">
              <img className="story" src={image} alt={altStory} />
            </li>
          )
        })}
      </ul>
      <div className="bottom-container">
        <div className="icons-cont">
          <BsGrid3X3 />
          <p className="sub-title">Posts</p>
        </div>

        {parseInt(postsCount) === 0 ? (
          <div className="no-post-container">
            <BiCamera className="camera-icon" />
            <p className="no-post-text">No Post Yet</p>
          </div>
        ) : (
          <ul className="posts-container">
            {posts.map(each => {
              const {id, image} = each
              return (
                <li key={id} className="posts-list">
                  <img className="image-post" src={image} alt={altPost} />
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Profile
