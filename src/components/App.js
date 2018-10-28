import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import { Switch, BrowserRouter, Route } from 'react-router-dom'



import LoadingBar from 'react-redux-loading'

import Dashboard from './Dashboard'
import QuestionDetails from './QuestionDetails'
import NewQuestion from './NewQuestion'
import LeaderBoard from './LeaderBoard'
import Header from './Header'
import Login from './Login'
import NotFound from './NotFound'

import './../App.css';

class App extends Component {
   componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
 
      
  render() {
  
    
    return (
    
 <BrowserRouter>
      
      <Fragment>
      <LoadingBar/>
      <Header/>
       <Switch>
      	
     			 <Route path='/login' exact component={Login} />
                  <Route path='/' exact component={Dashboard} />
                  <Route path='/questions/:question_id' component={QuestionDetails} />
                  <Route path='/add' exact component={NewQuestion} />
				  <Route path='/leaderboard' exact component={LeaderBoard} />
				  <Route path='*' exact={true} component={NotFound} />
              
 		</Switch>
	</Fragment>
      </BrowserRouter>

    );
  }
}

function mapStateToProps ({ authedUser, loadingBar }) {

  return {
    loading: authedUser === null,
    authedUser: authedUser
  }
}

export default connect(mapStateToProps)(App)
