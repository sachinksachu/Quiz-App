import axios from 'axios';
import { fetchQuiz, loadQuiz, errorQuiz } from './ActionCreator';
import { baseUrl } from './baseUrl';

export function fetchQuizAndOptions(filterObj,categoryId) {
  return (dispatch) => {
    var url = baseUrl + "amount="+filterObj.amount+"&category="+categoryId+"&difficulty="+filterObj.difficulty+"&type="+filterObj.type;
    
    dispatch(loadQuiz(true))

    axios.get(url).then((res) => {
      dispatch(fetchQuiz(res.data));
    })
    .catch((error) =>{
        dispatch(errorQuiz(error))
    })
  };
}
