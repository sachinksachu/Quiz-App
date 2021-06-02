import React from 'react';
import '../css/quizTemplate.css';
import QuizSideBar from './QuizSideBar';
import { Button, Card, CardBody, CardHeader, CardText, CardFooter } from 'reactstrap';
import '../css/result.css';
// Quiz container

const QuizContainer = ({ newData, count, saveResponse, clearResponse, setCount, submitted }) => {

    function getClassName(res, op) {
        // console.log("res", res, op)

        if (submitted) {
            if (op.answer) {
                return "result-option correct"
            }
            else if (res === op.id) {
                return "result-option wrong"
            }
            else {
                return "result-option other"
            }
        }
        else {
            if (op.id === res) {
                return "sdsd selected-answer result-option"
            }
            else {
                return "sdsd result-option"
            }
        }

        // item.id === dataObj[count].responseId ? : "sdsd"
    }

    const navigateFromSidebar = (questionNumber) => {
        setCount(questionNumber)
    }

    let dataObj = [...newData]

    return (
        <div className="quiz-template">
            <div className="quiz-holder">
                <Card key={count} className="col-sm-9 mb-2">
                    <CardHeader className="quiz-holder-head">
                        <h5>{dataObj[count].question}</h5>
                    </CardHeader>

                    <CardBody className="options-body">
                        {
                            dataObj[count].optionArray.map((op, i) => {
                                return (
                                    <div key={i} className={getClassName(dataObj[count].responseId, op)} onClick={() => saveResponse(op, i)} >
                                        <p id="opt"> {op.option} </p>

                                        {
                                            (dataObj[count].responseId === op.id && submitted) ? <p id="mark"><i className="fa fa-user"></i></p> : null
                                        }
                                        {
                                            (dataObj[count].responseId === op.id && op.answer && submitted) || (op.answer && submitted) ? <p id="mark"><i className="fa fa-check"></i></p> : null
                                        }
                                        {
                                            console.log("res", op.id),
                                            (dataObj[count].responseId === op.id && !op.answer && submitted) ? <p id="mark"><i className="fa fa-times"></i></p> : null
                                        }

                                    </div>)
                            })
                        }
                    </CardBody>
                    <CardFooter>
                        {
                            count !== 0 ? <Button onClick={() => setCount(count - 1)}><i className="fa fa-backward"></i></Button> : null
                        }
                        {
                            !submitted ? <Button onClick={() => clearResponse()}>Clear response</Button> : null
                        }

                        {
                            newData.length - 1 !== count ? <Button onClick={() => setCount(count + 1)}><i className="fa fa-step-forward"></i></Button> : null
                        }
                    </CardFooter>

                </Card>

                <div className="col-12 col-sm-3">
                    <QuizSideBar data={newData} navigateFromSidebar={navigateFromSidebar} count={count} submitted={submitted} />
                </div>
            </div>
        </div>
    )
}

export default QuizContainer;