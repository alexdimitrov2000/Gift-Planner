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
const CreateGift = React.lazy(() => import('../Gifts/CreateGift/CreateGift'));
const ProtectedRoute = React.lazy(() => import('../ProtectedRoute/ProtectedRoute'));

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
    const { isLogged } = this.state;

    return (
      <BrowserRouter>
        <div className="site">
          <Header isLogged={isLogged} />
          <Lights />
          <div className="site-main">
            <Switch>
              <Suspense fallback={<Loader className="loader" type="spinningBubbles" color="#0F8A5F" width="12rem" height="12rem" />}>
                <Route path="/" exact component={Home} />
                <ProtectedRoute redirectTo="/" isLogged={!isLogged} path="/login" exact render={(props) => <Login {...props} login={this.login} />} />
                <ProtectedRoute redirectTo="/" isLogged={!isLogged} path="/register" exact component={Register} />
                <ProtectedRoute redirectTo="/login" isLogged={isLogged} path="/logout" exact render={(props) => <Logout {...props} logout={this.logout} />} />
                <ProtectedRoute redirectTo="/login" isLogged={isLogged} path="/profile" exact component={Profile} />
                <ProtectedRoute redirectTo="/login" isLogged={isLogged} path="/gifts/create" exact component={CreateGift} />
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
