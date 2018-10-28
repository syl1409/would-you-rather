import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleNewQuestion } from '../actions/questions'
import { Redirect } from 'react-router-dom'


class NewQuestion extends Component {
  state = {
    text1: '',
    text2: '',
    toDashboard:false
  }
  handleChange1 = (e) => {
    const text = e.target.value

    this.setState(() => ({
      text1:text
    }))
  }
 handleChange2 = (e) => {
    const text = e.target.value

    this.setState(() => ({
      text2:text
    }))
  }
  handleSubmit = (e) => {
    e.preventDefault()
	console.log('state', this.state)  
    const { text1, text2 } = this.state
    const { dispatch } = this.props
    dispatch(handleNewQuestion(text1, text2));
     this.setState(() => ({
      toDashboard: true
    }))
  }
  render() {
    console.log('data', this.props.authedUser);
     if (this.props.authedUser === null ) {
      return <Redirect to={{
            pathname: '/login',
            state: { prevLocation: this.props.location }
        }} />
    }
      
   if (this.state.toDashboard === true) {
      return <Redirect to='/' />
    }
   const{ text1, text2} = this.state
    return (
      <div className="card containerApp">
        <h3 className='center'>Compose new Question</h3>
      	<h4>Would you rather:</h4>
        <form className='new-question' onSubmit={this.handleSubmit}>
          <input
            placeholder="Option one"
            value={text1}
            onChange={this.handleChange1}
            className='optionForm'
          />
  			<input
            placeholder="Option two"
            value={text2}
            onChange={this.handleChange2}
            className='optionForm'
          />
         
          <button
            className='button'
            type='submit'
            disabled={text1 === '' || text2 ===''}>
              Submit
          </button>
        </form>
      </div>
    )
  }
}

function mapStateToProps ({ authedUser }) {

  return {
    authedUser:authedUser

  }
}

export default connect(mapStateToProps)(NewQuestion)