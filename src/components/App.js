import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import { BrowserRouter as Router, Route } from 'react-router-dom'


import LoadingBar from 'react-redux-loading'

import Dashboard from './Dashboard'
import QuestionDetails from './QuestionDetails'
import NewQuestion from './NewQuestion'
import LeaderBoard from './LeaderBoard'
import Nav from './Nav'

import './../App.css';

class App extends Component {
   componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  
  render() {
    return (
    
 <Router>
        <Fragment>
          <LoadingBar />
          <div className='container'>
            <Nav />
            {this.props.loading === true
              ? null
              : <div>
                  <Route path='/' exact component={Dashboard} />
                  <Route path='/question/:question_id' component={QuestionDetails} />
                  <Route path='/add' component={NewQuestion} />
				  <Route path='/leaderboard' component={LeaderBoard} />
                </div>}
          </div>
        </Fragment>
      </Router>

    );
  }
}

function mapStateToProps ({ authedUser, loadingBar }) {

  return {
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App)
