import React from 'react';
import { Button, Card,CardHeader} from 'reactstrap';
import '../css/quizTemplate.css';

const QuizHeader = (props) =>{
    return(
        <div className="quiz-header">
        <Card>
            <CardHeader>
                <div className="quiz-header-card">
                    {/* <span><i className="fa fa-clock-o"></i></span> */}
                    <span id="count">{props.count + 1}/{props.total}</span>
                    
                    <span><Button onClick={() => props.toggleModal()}>Submit</Button></span>
                    
                </div>
            </CardHeader>
        </Card>
        </div>
    )
}
export default QuizHeader; 