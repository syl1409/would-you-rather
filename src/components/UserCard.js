import React, { Component } from 'react'
import { connect } from 'react-redux'
import { TiStarOutline } from "react-icons/ti";




class UserCard extends Component {
 
  render() {
	console.log('userCard', this.props)
   const {name, avatarURL, questions , answers} = this.props.user

    return (
      <div className="card">
      <div className="headerCard">
      	<div className="number">{this.props.i + 1}</div>
      	<h3>{name}</h3>
		<div className="score">
			<TiStarOutline/><span>Score</span>
			<span>{Object.values(answers).length +questions.length }</span>
		</div>
      </div>
      <div className="bodyCard">
		<div className="avatar" >
 			<img
             src={avatarURL}
            alt={`Avatar of ${name}`}
            className='avatar'
          />
		</div>

		<div className="question">
			
			<ul>
				<li>Answered questions: {Object.values(answers).length}</li>
				<li>created Questions: {questions.length}</li>
			</ul>
		</div>
	
	  </div>
	  
	  
      </div>
    )
  }
}


export default connect()(UserCard)