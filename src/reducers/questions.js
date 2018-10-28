import { RECEIVE_QUESTIONS, SAVE_ANSWER, NEW_QUESTION,ERROR_SAVING_ANSWER  } from '../actions/questions'

export default function questions( state = {}, action){
    switch(action.type){
        case RECEIVE_QUESTIONS:
            return {
                ...state,
                ...action.questions
              
        }
      case ERROR_SAVING_ANSWER:
        return {
                ...state,
                ...action.questions
              
        }
        
   		 case SAVE_ANSWER :
            const { answer, authedUser, qid } = action

             return {
                ...state,
               [qid]:{
                ...state[qid],
                 [answer]:{
                 ...state[qid][answer],
                   votes:state[qid][answer].votes.concat([authedUser])
                 }
               }

    		}
      case NEW_QUESTION :
        return{
          ...state,
          [action.question.id]: action.question
    
        }
        default :
            return state
    }
}