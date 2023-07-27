import {Switch, Route, Redirect} from 'react-router-dom'
import './App.css'
import Navbar from './components/NavBar/index'
import Login from './components/Login/Login'
import Home from './components/Home'
import MyProfile from './components/MyProfile/MyProfile'
import UserProfile from './components/UserProfile/UserProfile'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import SearchResult from './components/SearchResult/SearchResult'
import NotFound from './components/NotFound/NotFound'

const App = () => (
  <div className="app">
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/not-found" component={NotFound} />
      <>
        <Navbar />
        <Switch>
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/users/:id" component={UserProfile} />
          <ProtectedRoute exact path="/my-profile" component={MyProfile} />
          <ProtectedRoute exact path="/posts" component={SearchResult} />
          <Redirect to="/not-found" />
        </Switch>
      </>
    </Switch>
  </div>
)

export default App
