import { saveQuestionAnswer, saveQuestion } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'
import { saveUserAnswer, saveNewQuestionToUser, errorSavingUserAnswer } from './users'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const SAVE_ANSWER = 'SAVE_ANSWER'
export const NEW_QUESTION = 'NEW_QUESTION'
export const ERROR_SAVING_ANSWER = 'ERROR_SAVING_ANSWER'

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

function errorSavingAnswer (questions) {
    return {
      type: ERROR_SAVING_ANSWER,
      questions
    }
}

  
export function handleSaveAnswer (info) {
    return (dispatch, getState) => {
      dispatch(showLoading())
      const { questions, users } = getState()
      const oldQuestions = JSON.parse(JSON.stringify(questions));
      const oldUsers = JSON.parse(JSON.stringify(users));
  
      dispatch(saveAnswer(info))
      dispatch(saveUserAnswer(info))
      
      dispatch(hideLoading())
       return saveQuestionAnswer(info)
        .catch((e) => {
          console.warn('Error in handleSaveAnswer: ', e)
          dispatch(errorSavingUserAnswer(oldUsers))
          dispatch(errorSavingAnswer(oldQuestions))
         
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
     dispatch(showLoading())
    const { authedUser } = getState()
    
     return saveQuestion({
      optionOneText, 
      optionTwoText, 
      author:authedUser
    })
      .then((question) => {
       dispatch(newQuestion(question))
       dispatch(saveNewQuestionToUser(question))
     })
      .then(() => dispatch(hideLoading()))
  }
}

