// Code repo: https://github.com/adrianhajdin/project_mern_memories
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Container } from '@material-ui/core';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import Navbar from './components/Navbar/Navbar';

const App = () => (
  <BrowserRouter>
    <Container maxwidth='lg'>
      <Navbar />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/auth' exact component={Auth} />
      </Switch>
      <Home />
    </Container>
  </BrowserRouter>
);

export default App;
