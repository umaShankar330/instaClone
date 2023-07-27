import styled from 'styled-components'

export const PostContainer = styled.li`
  display: flex;
  flex-direction: column;
  width: 70vw;
  border: 2px solid #d4d3d2;
  margin-bottom: 20px;
  background-color: white;
`

export const TopContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 18px;
`
export const ProfilePic = styled.img`
  height: 30px;
  width: 30px;
  border-radius: 50%;
`
export const Username = styled.p`
  margin-left: 10px;
`

export const PostImage = styled.img`
  width: 70w;
  height: 480px;
  object-fit: cover;
  margin: 0;
`
export const BottomSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
  margin-left: 18px;
  margin-bottom: 10px;
`

export const IconsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 13px;
  margin-top: 0px;
`
export const IconBtn = styled.button`
  outline: none;
  background: none;
  border: none;
  padding: 0;
`
export const Icons = styled.img`
  //   background-color: ${each => (each.isLike ? 'red' : null)};
  height: 18px;
`

export const Caption = styled.p`
  margin: 0;
`

export const CommentsSection = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0;
  gap: 7px;
`
export const CommentRow = styled.li`
  display: flex;
  align-items: center;
  margin: 0;
  gap: 5px;
`
export const CommentUser = styled.h4`
  margin: 0;
  font-weight: 600;
`

export const CommentPara = styled.p`
  margin: 0;
`
export const Time = styled.p`
  color: #bababa;
  margin: 0;
`
