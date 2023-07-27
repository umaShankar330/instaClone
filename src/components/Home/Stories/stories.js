import './Story.css'

const Stories = props => {
  const {list} = props
  const {userId, storyUrl} = list
  console.log(userId)
  return <img className="Story" src={storyUrl} alt="user story" />
}

export default Stories
