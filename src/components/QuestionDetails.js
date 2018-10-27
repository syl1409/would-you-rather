import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion } from '../utils/helpers'
import { Line } from 'rc-progress';
import { handleSaveAnswer } from '../actions/questions'
import { Redirect } from 'react-router-dom'


 class QuestionDetails extends Component {
   
    state = {
    selectedOption: 'optionOne',
    toDashboar:false
  }
   
    handleSubmit = (e) => {
    e.preventDefault()
    const { selectedOption } = this.state
    const answer = selectedOption
    const { dispatch, id, authedUser } = this.props
      dispatch(handleSaveAnswer({
       qid: id,
       authedUser,
       answer
     }))
    this.setState(() => ({
      toDashboard: true
    }))
  }

handleOptionChange = (e) => {
    const option = e.target.value

    this.setState(() => ({
      selectedOption: option
    }))
  }
  render() {
    if (this.state.toDashboard === true) {
      return <Redirect to='/' />
    }
      if (this.props.authedUser === null) {
      return <Redirect to='/login' />
    }
    console.log('data', this.props);
    const { userVotesFor, wasAnswered } = this.props
    const {author, text1, text2, votes1, votes2, avatar, date} = this.props.question;
    const total = votes1.length + votes2.length;
    console.log('values',text2, userVotesFor)
    if(wasAnswered){
    return (
        <div className="card">
        <div className="headerCard">
          <h2>Question Made by:  {author}</h2>
          <p>{date}</p>
        </div>
      <div className="bodyCard">
		<div className="avatar" >
 			<img
            src={avatar}
            alt={`Avatar of ${author}`}
            className='avatar'
          />
		</div>

		<div className="question">
			<h3>Results:</h3>
			<ul className="results">
				<li className={text1 === userVotesFor ? 'active' : ''}>
					<span className={text1 === userVotesFor ? 'badge active' : 'badge'}>Your answer</span>
					<span className="answer">{text1}</span>
				 	<Line percent={(votes1.length*100)/total} strokeWidth="4" strokeColor="#D3D3D3" />
					<span className="results">{votes1.length} of {total} | {(votes1.length*100)/total}%</span>
				</li>
				<li className={text2 === userVotesFor ? 'active' : ''}>
					<span className={text2 === userVotesFor ? 'badge active' : 'badge'}>Your answer</span>
					<span className="answer">{text2}</span>
				 	<Line percent={(votes2.length*100)/total} strokeWidth="4" strokeColor="#D3D3D3" />
					<span className="results">{votes2.length} of {total} | {(votes2.length*100)/total}%</span>
				</li>
				
			</ul>
		</div>
	  </div>
	  <div className="fotterCard">
	  </div>
	  
      </div>
    )}else{
		  return (
        <div className="card">
        <div className="headerCard">
          <h2>Question Made by:  {author}</h2>
          <p>{date}</p>
        </div>
      <div className="bodyCard">
		<div className="avatar" >
 			<img
            src={avatar}
            alt={`Avatar of ${author}`}
            className='avatar'
          />
		</div>
<div className="question">
			<h3>Would you rather:</h3>
 <form onSubmit={this.handleSubmit}>
    <div className="radio">
      <label>
        <input type="radio" value="optionOne" 
                      checked={this.state.selectedOption === 'optionOne'} 
                      onChange={this.handleOptionChange} />
{text1}
      </label>
    </div>
    <div className="radio">
      <label>
        <input type="radio" value="optionTwo" 
                      checked={this.state.selectedOption === 'optionTwo'} 
                      onChange={this.handleOptionChange} />
{text2}
      </label>
    </div>
   <button
            	className="button"
            	type='submit'
            	>
              Submit
          </button>
  </form>

		</div>
	  </div>
 </div>
	
	  
    )
	}
  }
}
 function mapStateToProps ({ authedUser, questions, users }, props) {
 if(authedUser !== null){
  const { question_id } = props.match.params
  const question = questions[question_id] ? formatQuestion(questions[question_id], users) : null
  const answer1 = question.votes1.find(x=> x === authedUser);
  const answer2 = question.votes2.find(x=> x === authedUser);
  const wasAnswered = answer2 !== undefined || answer1 !== undefined ? true : false
  let userVotesFor;
console.log('se respondio=?', wasAnswered, answer1, answer2)
  if (wasAnswered){
console.log('se respondio')
	if(answer1){
console.log('respuesta 1', answer1)
     userVotesFor = question.text1
    }else{
console.log('respuesta 2', answer2, question.text2)
     userVotesFor = question.text2
    }
  } 
  console.log(authedUser, question.votes1, question.votes2, wasAnswered)
   return {
    id:question_id,
    question: question,
    wasAnswered,
	userVotesFor,
	authedUser

       
  }
}else{
 return {
    authedUser
  }
}

}
 export default connect(mapStateToProps)(QuestionDetails) 