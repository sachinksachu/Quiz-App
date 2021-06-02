import React from 'react';
import { Card, CardBody } from 'reactstrap';
import '../css/quizTemplate.css';

const QuizSideBar = ({data, navigateFromSidebar, count, submitted}) =>{

    function getClassName(item,index){
        let result = "";

        switch (true) {
            case count === index:
                result = "current"
                break;

            case item.responseId !== -1 && !submitted:
                result = "sidebar-highlight"
                break;

            case item.responseId !== -1 && submitted && item.correct:
                result = "sidebar-highlight-answer"
                break;

            case item.responseId !== -1 && submitted && !item.correct:
                result = "sidebar-highlight-wrong"
                break;

            default:
                result = "sidebar-normal"

        }
        return result;
    }

    return(
        <Card >
            <CardBody className="row sidebar">
                {
                    data.map((item,i) =>{
                        return(
                            <div className="col-3 tile" onClick={() => navigateFromSidebar(i)} key={i}>
                            <p className={getClassName(item,i)}>{i+1}</p>
                        </div>
                        )
                        
                    })
                    
                }
                
            </CardBody>
        </Card>
    )
}
export default QuizSideBar; 