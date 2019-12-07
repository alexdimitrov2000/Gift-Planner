import React, { Suspense } from 'react';
import './App.css';
import Header from '../Header/Header';
import Lights from '../Lights/Lights';
import Footer from '../Footer/Footer';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

const Home = React.lazy(() => import('../Home/Home'));
const Login = React.lazy(() => import('../Login/Login'));
const Register = React.lazy(() => import('../Register/Register'));
const Profile = React.lazy(() => import('../Profile/Profile'));

function App() {
  return (
    <BrowserRouter>
      <div className="site">
        <Header />
        <Lights />
        <div className="site-main">
          <Switch>
            <Suspense fallback={<div>Loading...</div>}>
              <Route path="/" exact component={Home} />
              <Route path="/login" component={Login} />
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

export default App;
