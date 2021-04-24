import React, { useEffect, useState } from 'react';
import {withRouter, useHistory} from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, Card, CardBody, CardHeader, CardText, CardFooter } from 'reactstrap';
import QuizHeader from './QuizHeader';
import QuizSideBar from './QuizSideBar';
import ModalComponent from "./Modal";
import '../css/quizTemplate.css';

const QuizTemplate = (props) => {


    //process array
    const processArray = async () => {
        const newData = quest.map((item, index) => {

            let optionArray = []

            let obj1 = {
                id: 3,
                answer: true,
                option: item.correct_answer, //pushing correct answer to option array
                selected: false
            }

            optionArray.push(obj1)

            item.incorrect_answers.forEach((o, i) => { //pushhing incorrect answers to option array
                let obj2 = {
                    id: i,
                    answer: false,
                    option: o,
                    selected: false
                }
                optionArray.push(obj2)
            })

            optionArray.sort(() => Math.random() - 0.5) //shuffling option array

            return { ...item, optionArray: optionArray, responseId: -1, correct: null }

        })

        setNewData(newData)
    }

    //save response

    const saveResponse = (item, index) => {

        let responseQuest = [...newData]

        let obj = {
            id: item.id,
            answer: item.answer,
            option: item.option,
            selected: true,
        }
        responseQuest[count].optionArray[index] = obj;
        responseQuest[count].responseId = item.id
        if (item.answer) {
            responseQuest[count].correct = true
        }
        else {
            responseQuest[count].correct = false
        }

        setNewData(responseQuest)
        setCount(count + 1)
    }

    //clear response

    const clearResponse = () => {
        let responseQuest = [...newData]
        responseQuest[count].responseId = -1;
        setNewData(responseQuest)
    }

    // Quiz container

    const QuizContainer = () => {
        let dataObj = [...newData]

        return (
            <div className="quiz-template">
                <div className="quiz-holder">


                    <Card key={count} className="col-sm-9">
                        <CardHeader>
                            {dataObj[count].question}
                        </CardHeader>

                        <CardBody className="options-body">
                            {
                                dataObj[count].optionArray.map((item, i) => {
                                    return (<CardText key={i} onClick={() => saveResponse(item, i)} className={item.id === dataObj[count].responseId ? "selected-answer" : "options"}> {item.option} </CardText>)
                                })
                            }
                        </CardBody>
                        <CardFooter>
                            {
                                count !== 0 ? <Button onClick={() => setCount(count - 1)}><i className="fa fa-backward"></i></Button> : null
                            }
                            <Button onClick={() => clearResponse()}>Clear response</Button>
                            {
                                quest.length - 1 !== count ? <Button onClick={() => setCount(count + 1)}><i className="fa fa-step-forward"></i></Button> : null
                            }
                        </CardFooter>

                    </Card>

                    <div className="col-3">
                        <QuizSideBar data={newData} navigateFromSidebar={navigateFromSidebar}/>
                    </div>
                </div>
            </div>
        )
    }

    const [newData, setNewData] = useState([])
    const [quest] = useState(props.location.state?.data)
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        processArray()
    }, [])

    const [count, setCount] = useState(0)
    let history = useHistory();
    // console.log("history", history)
    const toggleModal = () => {
        setShowModal(!showModal)
    }

    const submitQuiz = () => {
        setShowModal(!showModal)
        history.push({ pathname: '/result', state: { newData } });
    }

    const navigateFromSidebar = (questionNumber) => {
        setCount(questionNumber)
    }

    useEffect(() => {
      
        // returned function will be called on component unmount 
        return () => {
            history.goForward()
        }
      }, [])

    return (
        <>
            <h1>Quiz template</h1>
            <QuizHeader toggleModal={toggleModal} count={count} total={quest.length}/>
            {newData.length > 0 ? <QuizContainer /> : null}

            <ModalComponent showModal={showModal} toggleModal={toggleModal} confirmModal={true} submitQuiz={submitQuiz}/>
        </>
    )
}

QuizTemplate.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        category: PropTypes.string,
        type: PropTypes.string,
        difficulty: PropTypes.string,
        question: PropTypes.string,
        correct_answer: PropTypes.number,
        incorrect_answers: PropTypes.array

    }))
};

export default withRouter(QuizTemplate);
