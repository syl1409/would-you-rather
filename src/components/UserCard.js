import React, { Component } from 'react'
import { connect } from 'react-redux'


class UserCard extends Component {
 
  render() {
	console.log('userCard', this.props)
   const {name, avatarURL, questions , answers} = this.props.user

    return (
      <div className="card">
      
      <div className="bodyCard">
		<div className="avatar" >
 			<img
             src={avatarURL}
            alt={`Avatar of ${name}`}
            className='avatar'
          />
		</div>

		<div className="question">
			<h3>{name}</h3>
			<ul>
				<li>Answered questions: {Object.values(answers).length}</li>
				<li>created Questions: {questions.length}</li>
			</ul>
		</div>
	<div className="score">
			<h3>Score</h3>
			<h4>{Object.values(answers).length +questions.length }</h4>
		</div>
	  </div>
	  
	  
      </div>
    )
  }
}

function mapStateToProps ({ users }, { id }) {

     return {
      users
    }
}

export default connect(mapStateToProps)(UserCard)