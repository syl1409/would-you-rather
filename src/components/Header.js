import React, { Component } from 'react'
import { connect } from 'react-redux'
import Nav from './Nav'
import LoadingBar from 'react-redux-loading'
import { setAuthedUser } from '../actions/authedUser'
import { FaAngleDown, FaAngleUp } from "react-icons/fa";





class Header extends Component {
  state={
  	openMenu:false
  }

	toggleMenu=()=>{
      this.setState( (state) => ({openMenu : !state.openMenu}) );
      console.log(this.state)
    }


 
 logout = () => {
   this.props.dispatch(setAuthedUser(null))
 }


  render() {
    console.log('Header', this.props);
    const {currentUser } = this.props;
    
    return (
      <div>
  {this.props.loading === true
              ? null :
   <div className="header">
    <Nav/>
      <div className="CurrentUser">
        <div className="avatarBox">
              <img
              src={currentUser.avatarURL}
              alt={`Avatar of ${currentUser.name}`}
              className='avatar'
            />
          </div>
			<p onClick={()=>{this.toggleMenu()}}>{currentUser.name}{this.state.openMenu ? <FaAngleUp/>: <FaAngleDown/>}</p>
			{this.state.openMenu ? 
				<div className="Menu">
					<ul>
						<li onClick={this.logout}>Logout</li>
					</ul>
				</div>
			: ''}
      		
      </div>
</div>}
      </div>
    )
  }
}

function mapStateToProps ({ authedUser, loadingBar, users }) {
  const actualUser = Object.values(users).filter(x=> x.id === authedUser)[0];
  return {
    loading: authedUser === null,
currentUser: actualUser
  }
}



export default connect(mapStateToProps)(Header)