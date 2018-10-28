import React, { Component  } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { Redirect, withRouter  } from 'react-router-dom'


class Login extends Component {
  state = {
    userId: 'sarahedo',
    authed: false
  }

 handleSubmit = (e) => {
    e.preventDefault()
   this.props.dispatch(setAuthedUser(this.state.userId))
    this.setState(() => ({
      authed:true
    }))
 }

handleSelectChange =(e)=>{
   const option = e.target.value
    this.setState(() => ({
      userId:option
    }))
}
  render() {
    console.log('login', this.props.location);
   let lastpath;
   if ( this.props.location.state !== undefined){
   	lastpath =  this.props.location.state.prevLocation.pathname;
   }else{
   	lastpath = '/';
   }
	console.log('pevL',lastpath)
   const { users } = this.props;
   const { authed } = this.state;
	
  if (authed) {
      return <Redirect to={lastpath} />
    }
    return (
      <div className="login">
      	<h2>Welcome!</h2>
        <div className="logo">
              <img src="https://cdn-images-1.medium.com/max/800/0*1p4U99DAhsOHqX-m.jpg" alt="logo"/>
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

export default withRouter(connect(mapStateToProps)(Login))