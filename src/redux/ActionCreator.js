import * as ActionTypes from './ActionTypes';

export function fetchQuiz(data) {
    return {
      type: ActionTypes.LOAD_QUIZ,
      payload: data
    };
  }
  export function loadQuiz(data) {
    return {
      type: ActionTypes.QUIZ_LOADING,
      payload: data
    };
  }

  export function errorQuiz(data) {
    return {
      type: ActionTypes.QUIZ_FAILED,
      payload: data
    };
  }