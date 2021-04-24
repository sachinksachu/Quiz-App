import * as ActionTypes from './ActionTypes';

export const quizReducer =(state ={isLoading: true,
        errMess: null,
        data: []
        }, action) => {
        	 switch(action.type) {
        		case ActionTypes.LOAD_QUIZ:
            		return {...state,isLoading: false, errMess: null, data: action.payload};

        		case ActionTypes.QUIZ_LOADING:
           		return {...state,isLoading: true, errMess: null, data: []};

        		case ActionTypes.QUIZ_FAILED:
            		return {...state,isLoading: false, errMess: action.payload, data: []};

        		default:
            		return state;
    }
}
