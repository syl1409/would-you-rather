import { saveQuestionAnswer, saveQuestion } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const SAVE_ANSWER = 'SAVE_ANSWER'
export const NEW_QUESTION = 'NEW_QUESTION'

export function receiveQuestions (questions) {
    return{
        type: RECEIVE_QUESTIONS,
        questions,
    }
}

function saveAnswer ({  authedUser, qid, answer }) {
    return {
      type: SAVE_ANSWER,
      authedUser,
      qid,
      answer
    }
}

  
export function handleSaveAnswer (info) {
    return (dispatch) => {
      dispatch(saveAnswer(info))
       return saveQuestionAnswer(info)
        .catch((e) => {
          console.warn('Error in handleSaveAnswer: ', e)
          /* Todo: dispatch(toggleTweet(info))*/
          alert('The was an error on your anwser.')
        })
    }
  } 

function newQuestion (question) {
  return {
    type: NEW_QUESTION,
    question,
  }
}
 export function handleNewQuestion (optionOneText, optionTwoText, ) {
  return (dispatch, getState) => {
    const { authedUser } = getState()
    
     dispatch(showLoading())
     return saveQuestion({
      optionOneText, 
      optionTwoText, 
      author:authedUser
    })
      .then((question) => dispatch(newQuestion(question)))
      .then(() => dispatch(hideLoading()))
  }
}

