import React, { Component } from 'react';
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import LoadingBar from 'react-redux-loading'

import Dashboard from './Dashboard'
import QuestionDetails from './QuestionDetails'
import NewQuestion from './NewQuestion'
import LeaderBoard from './LeaderBoard'

import './../App.css';

class App extends Component {
   componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  
  render() {
    return (
      <div className="App">
       <LoadingBar />
       {this.props.loading === true
            ? null
            : <div>
               
      { /*<QuestionDetails match={{params: {id: 'vthrdm985a262al8qx3do'}}}/>*/}
      			<LeaderBoard/>
              </div>}
    	
      </div>
    );
  }
}

function mapStateToProps ({ authedUser, loadingBar }) {

  return {
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App)
