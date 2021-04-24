import { createStore, combineReducers, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';


import { quizReducer } from './Reducer';


export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            quiz: quizReducer,
            
        }),
        applyMiddleware(thunk)
    );

    return store;
}
