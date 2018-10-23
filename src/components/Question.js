import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion } from '../utils/helpers'


class Question extends Component {
 
  render() {
	console.log('question', this.props)
   	const {author, text1, text2, avatar, date} = this.props.question;
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
			<h3>Would You Rather:</h3>
			<ul>
				<li>{text1}</li>
				<li>{text2}</li>
			</ul>
		</div>
	  </div>
	  <div className="fotterCard">
	  	<div className="button">Check detail</div>
	  </div>
	  
      </div>
    )
  }
}

function mapStateToProps ({ questions, users }, { id }) {
const question = questions[id]
     return {
      question: question
       ? formatQuestion(question, users) : null,
    }
}

export default connect(mapStateToProps)(Question)