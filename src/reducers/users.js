import { RECEIVE_USERS, SAVE_USER_ANSWER, SAVE_NEW_QUESTION_TO_USER } from '../actions/users'

export default function users( state = {}, action){
    switch(action.type){
        case RECEIVE_USERS:
            return {
                ...state,
                ...action.users
        }
      case SAVE_USER_ANSWER:
       const { answer, authedUser, qid } = action
        return{
        	...state,
          [authedUser]:{
          	...state[authedUser],
            answers:{
              ...state[authedUser].answers,
              [qid]:answer
            }
          }
        }
      case SAVE_NEW_QUESTION_TO_USER:
        const {question} = action
        console.log('dataQ', question)
       
        return{
            ...state,
        [question.author]: {
          ...state[question.author],
          questions: state[question.author].questions.concat([question.id])
        }
        }
        default :
            return state
    }
}