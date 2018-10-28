import React, { Component } from 'react'
import { connect } from 'react-redux'
import Nav from './Nav'
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { withRouter } from 'react-router-dom'





class Header extends Component {
  state={
  	openMenu:false
  }

	toggleMenu=()=>{
      this.setState( (state) => ({openMenu : !state.openMenu}) );
    }


 
 logout = () => {
   this.props.history.push({
  pathname: '/login',

})
   this.setState( () => ({openMenu : false}) );
 }


  render() {
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



export default withRouter(connect(mapStateToProps)(Header))