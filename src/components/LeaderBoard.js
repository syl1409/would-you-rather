import React, { Component, Fragment  } from 'react'
import { connect } from 'react-redux'
import UserCard from './UserCard'
import { compareValues } from '../utils/helpers'

class LeaderBoard extends Component {

  render() {
    console.log('leaderBoard', this.props);
    const { users } = this.props
   
    return (
      <div>
      LeaderBoard
      {users.map((user)=>(
      <li key={user.id}>
    	<UserCard user={user}/>
      </li>
    
    ))}
     </div>
    )
  }
}

function mapStateToProps ({ users  }) {
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
    
    })

  return {
    users:formatUsers.sort(compareValues('score', 'desc'))
  }
}

export default connect(mapStateToProps)(LeaderBoard)