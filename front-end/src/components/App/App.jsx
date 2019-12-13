import React, { Suspense } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Loader from 'react-loading';
import Header from '../Header/Header';
import Lights from '../Lights/Lights';
import Footer from '../Footer/Footer';
import userService from '../../services/user-service';
import auth from '../../utils/auth';

const Home = React.lazy(() => import('../Home/Home'));
const Login = React.lazy(() => import('../Login/Login'));
const Logout = React.lazy(() => import('../Logout/Logout'));
const Register = React.lazy(() => import('../Register/Register'));
const Profile = React.lazy(() => import('../Profile/Profile'));

class App extends React.Component {
  constructor(props) {
    super(props);

    const isLogged = auth.isLogged();
    this.state = { isLogged };
  }
  
  logout = (history) => {
    userService.logout().then(() => {
      this.setState({ isLogged: false });
      history.push('/');
    });
  }

  login = (history, data) => {
    return userService.login(data).then(() => {
      this.setState({ isLogged: true });
      history.push('/');
    })
  }

  render() {
    return (
      <BrowserRouter>
        <div className="site">
          <Header isLogged={this.state.isLogged} />
          <Lights />
          <div className="site-main">
            <Switch>
              <Suspense fallback={<Loader className="loader" type="spinningBubbles" color="#0F8A5F" width="12rem" height="12rem" />}>
                <Route path="/" exact component={Home} />
                <Route path="/login" render={(props) => <Login {...props} login={this.login} />} />
                <Route path="/logout" render={(props) => <Logout {...props} logout={this.logout} />} />
                <Route path="/register" component={Register} />
                <Route path="/profile" component={Profile} />
              </Suspense>
            </Switch>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
