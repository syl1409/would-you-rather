import React, { Component  } from 'react'
import { connect } from 'react-redux'
import UserCard from './UserCard'
import { compareValues } from '../utils/helpers'
import { Redirect } from 'react-router-dom'


class LeaderBoard extends Component {
 

  render() {
     if (this.props.authedUser === null) {
      return <Redirect to={{
            pathname: '/login',
            state: { prevLocation: this.props.location }
        }} />
    }

    const { users } = this.props;
   
    return (
      <div className="containerApp">
      {users.map((user, index)=>(
      <li key={user.id} className="cardUserScore">
    	<UserCard user={user} i={index}/>
      </li>
    
    ))}
     </div>
    )
  }
}

function mapStateToProps ({ users, authedUser  }) {
  	let formatUsers = []
    Object.values(users).map((user)=>{
      const score = Object.values(user.answers).length + user.questions.length
      const currentUser = {
      id: user.id,
      name: user.name,
      avatarURL: user.avatarURL,
      questions: user.questions,
      answers: user.answers,
      score: score
      }
      
      formatUsers.push(currentUser)
      return null
    })

  return {
    users:formatUsers.sort(compareValues('score', 'desc')),
    authedUser
  }
}

export default connect(mapStateToProps)(LeaderBoard)