import './App.css';
import {
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import React, { useContext } from "react";
import { BrowserRouter as Router,} from 'react-router-dom';
import {AuthContext} from './contexts/AuthContext'
import AuthProvider from './contexts/AuthContext'
import MonitorProvider from './contexts/MonitorContext'
import NotificationProvider from './contexts/NotificationContext'

import Dashboard from './views/Dashboard'
import Homepage from './views/Homepage';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const auth = useContext(AuthContext);
  return (
    <Route {...rest} render={(props) => (
      auth.user ?
        <Component {...props} /> : <Redirect to='/' />
    )} />
  )
}

function App() {
  const auth = useContext(AuthContext);
  return (
    <MonitorProvider user={auth.user}>
      <NotificationProvider user={auth.user}>
        <Router>
          <Switch>
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <Route path="/" component={Homepage} />
          </Switch>
        </Router>
      </NotificationProvider>
    </MonitorProvider>
  );
}

function AppWrapper() {
  return (
    <AuthProvider>
      
          <App/>
        
</AuthProvider>
  )
}

export default AppWrapper;