import styled from 'styled-components'

export const NavSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0px;
  width: 100%;
  border-bottom: 2px solid #d4d3d2;
  background-color: white;
`

export const NavBarContainer = styled.nav`
  display: flex;
  align-items: center;
  height: 10vh;
  justify-content: space-between;
  padding: 20px 40px;
  margin: 0;
  background-color: ${props => (props.isDark ? '#212121' : 'white')};
  @media screen and (max-width: 768px) {
    padding: 15px 20px;
  }
`
export const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`

export const NavLogo = styled.img`
  height: 30px;

  @media screen and (max-width: 768px) {
    height: 25px;
    width: 110px;
  }
`
export const LogoTitle = styled.p`
  color: #262626;
  font-feature-settings: 'clig' off, 'liga' off;
  font-family: 'Roboto';
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
`

export const NavItems = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
`

export const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`

export const SearchInput = styled.input`
  height: 28px;
  flex-shrink: 0;
  outline: none;
  border-radius: 3px;
  padding-left: 10px;
  border: 1px solid #dbdbdb;
  background: #fafafa;
`

export const SearchBtn = styled.button`
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #909090;
  padding: 0px 15px;
`

export const LinksText = styled.p``

export const ExitIcon = styled.button`
  border: none;
  background-color: transparent;
  color: black;
  outline: none;
  font-size: 23px;
  display: flex;
  align-items: center;
  color: ${props => (props.isDark ? 'white' : null)};
  @media screen and (min-width: 768px) {
    display: none;
  }
`
export const ExitBtn = styled.div`
  border: none;
  outline: none;
  background-color: transparent;
  display: flex;
  align-items: center;
`

export const DisplaySection = styled.div`
  display: ${props => (props.isCollapse ? null : 'none')};
`
export const LogoutBtn = styled.button`
  height: 30px;
  width: 100px;
  background-color: #3b82f6;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  color: white;
`
export const PopupContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px 30px;
  background-color: black;
`
export const PopupText = styled.p`
  color: white;
`
export const PopupBtnContainer = styled.div`
  display: flex;
`
export const CloseBtn = styled.button`
  height: 30px;
  width: 100px;
  outline: none;
  border: 1px solid white;
  background-color: transparent;
  color: white;
  margin-right: 15px;
`

export const ConfirmBtn = styled.button`
  height: 30px;
  width: 100px;
  outline: none;
  border: none;
  background-color: blue;
  color: white;
`
