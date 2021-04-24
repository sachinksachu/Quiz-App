import React from 'react';
import { Card, CardBody } from 'reactstrap';
import '../css/quizTemplate.css';

const QuizSideBar = ({data, navigateFromSidebar}) =>{

    return(
        <Card >
            <CardBody className="row sidebar">
                {
                    data.map((item,i) =>{
                        return(
                            <div className="col-3 tile" onClick={() => navigateFromSidebar(i)} key={i}>
                            <p className={item.responseId !== -1 ? "sidebar-highlight" : null }>{i+1}</p>
                        </div>
                        )
                        
                    })
                    
                }
                
            </CardBody>
        </Card>
    )
}
export default QuizSideBar; 