import React from 'react';
import { Card, CardBody } from 'reactstrap';
import '../css/quizTemplate.css';

const QuizSideBar = ({data, navigateFromSidebar, count, submitted}) =>{

    function getClassName(item,index){
        if(count === index){
            return "current"
        }
        
        if(item.responseId !== -1 && !submitted){
            return "sidebar-highlight"
        }

        if(item.responseId !== -1 && submitted && item.correct){
            return "sidebar-highlight-answer"
        }


        if(item.responseId !== -1 && submitted && !item.correct){
            return "sidebar-highlight-wrong"
        }

        if(item.responseId === -1){
            return "sidebar-normal"
        }
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