import React from 'react';
import { Card, CardBody } from 'reactstrap';
import '../css/quizTemplate.css';

const QuizSideBar = ({data, navigateFromSidebar, count}) =>{

    function getClassName(id,index){
        if(id !== -1){
            return "sidebar-highlight"
        }
        else if(count === index){
            return "current"
        }
        else{
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
                            <p className={getClassName(item.responseId,i)}>{i+1}</p>
                        </div>
                        )
                        
                    })
                    
                }
                
            </CardBody>
        </Card>
    )
}
export default QuizSideBar; 