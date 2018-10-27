import React, { Component, Fragment  } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { Redirect } from 'react-router-dom'


class Login extends Component {
  state = {
    userId: 'sarahedo',
    toDashboard: false
  }

 handleSubmit = (e) => {
    e.preventDefault()
   this.props.dispatch(setAuthedUser(this.state.userId))
    this.setState(() => ({
      toDashboard:true
    }))
 }

handleSelectChange =(e)=>{
   const option = e.target.value
    this.setState(() => ({
      userId:option
    }))
}
  render() {
    console.log('login', this.props);
   const { users } = this.props;
   const { toDashboard } = this.state;
	
  if (toDashboard) {
      return <Redirect to='/' />
    }
    return (
      <div className="login">
      	<h2>Welcome!</h2>
        <div className="logo">
              <img src="https://cdn-images-1.medium.com/max/800/0*1p4U99DAhsOHqX-m.jpg"/>
          </div>
      	<p>Choose a user</p>
      	<form  onSubmit={this.handleSubmit} >
           <select onChange={this.handleSelectChange} value={this.state.userId}>
            {users.map((user)=>(
                <option value={user} key={user}>{user}</option>
            ))}
      	</select>
		<button type="submit" className="loginB">Login</button>
     	</form>
      
      </div>
    )
  }
}

function mapStateToProps ({ users }) {

  return {
    users: Object.keys(users),

  }
}

export default connect(mapStateToProps)(Login)