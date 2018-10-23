import React, { Component, Fragment  } from 'react'
import { connect } from 'react-redux'
import Question from './Question'


class Dashboard extends Component {
  state = {
    currentView: 'unanswered',
  }

  tab = (text) => {
        this.setState({
      currentView: text
    });
    }
 tab2 = (text) => {
     console.log(text);
    }
  render() {
    console.log('dashboard', this.props);
    const {answeredQuestionID, otherQuestionsID } = this.props;
	const { currentView } = this.state;
    
    return (
      <div>
      <div className="tabs">
      	<ul>
      		<li onClick={()=>{this.tab('unanswered')}} className={currentView === 'unanswered' && 'active' }>Unanswered Questions</li>
            <li onClick={()=>{this.tab('answered')}} className={currentView === 'answered' && 'active' }>Answered Questions</li>
        </ul>
      </div>

		{currentView === 'unanswered' ?
         <Fragment>
        
          <ul className="panel">
              {otherQuestionsID.map((id) => (
              <li key={id}>
                 <Question id={id}/>
              </li>
            ))}  

          </ul>
		</Fragment>: 
		<Fragment>
         
           <ul className="panel">
                {answeredQuestionID.map((id) => (
                <li key={id}>
                   <Question id={id}/>
                </li>
              ))}  

            </ul>
		  </Fragment>
}
		
	
      
      </div>
    )
  }
}

function mapStateToProps ({ questions, users, authedUser }) {
 console.log('questions', questions)
  const actualUser = Object.values(users).filter(x=> x.id === authedUser)[0];
  
  
  const questionIds = Object.keys(questions).sort((a,b) => questions[b].timestamp - questions[a].timestamp);
  const answerQuestions = Object.keys(actualUser.answers);
  const otherQuestions =  questionIds.filter(f => !answerQuestions.includes(f));
  const answerQuestionsId =  questionIds.filter(f => answerQuestions.includes(f));

  return {
    answeredQuestionID: answerQuestionsId,
    otherQuestionsID:otherQuestions
  }
}

export default connect(mapStateToProps)(Dashboard)