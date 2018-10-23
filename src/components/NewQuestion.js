import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleNewQuestion } from '../actions/questions'

class NewQuestion extends Component {
  state = {
    text1: '',
    text2: '',
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
  }
  render() {
   const{ text1, text2} = this.state
    return (
      <div clss="card">
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
            className='btn'
            type='submit'
            disabled={text1 === '' || text2 ===''}>
              Submit
          </button>
        </form>
      </div>
    )
  }
}

export default connect()(NewQuestion)