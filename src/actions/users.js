export const RECEIVE_USERS = 'RECEIVE_USERS'
export const SAVE_USER_ANSWER = 'SAVE_USER_ANSWER'
export const SAVE_NEW_QUESTION_TO_USER = 'SAVE_NEW_QUESTION_TO_USER'
export const ERROR_SAVING_USER_ANSWER = 'ERROR_SAVING_USER_ANSWER'

export function receiveUsers (users) {
    return{
        type: RECEIVE_USERS,
        users,
    }
}

export function saveUserAnswer ({  authedUser, qid, answer }) {
    return {
      type: SAVE_USER_ANSWER,
      authedUser,
      qid,
      answer
    }
}
export function errorSavingUserAnswer ( users) {
    return{
        type: RECEIVE_USERS,
        users,
    }
}


export function saveNewQuestionToUser(question) {
    return {
      type: SAVE_NEW_QUESTION_TO_USER,
      question,
    }
}
