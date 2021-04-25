import React, { useEffect, useState } from 'react';
import {withRouter, useHistory} from 'react-router-dom';
import PropTypes from 'prop-types';
import ResultHeader from './ResultHeader';
import QuizHeader from './QuizHeader';
import QuizContainer from './QuizContainer'
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

        if(!submitted){

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
        if(newData.length - 1 !== count)
        setCount(count + 1)   
        
        }
    }

    //clear response
    const clearResponse = () => {
        let responseQuest = [...newData]
        responseQuest[count].responseId = -1;
        setNewData(responseQuest)
    }


    const [newData, setNewData] = useState([])
    const [quest] = useState(props.location.state?.data)
    const [showModal, setShowModal] = useState(false)
    const [count, setCount] = useState(0)
    const [submitted, setSubmitted] = useState(false)
    let history = useHistory();

    useEffect(() => {
        processArray()
        return () => { // returned function will be called on component unmount
            history.goForward()
        }
    }, []) 
    
    const toggleModal = () => {
        setShowModal(!showModal)
    }

    const submitQuiz = () => {
        setShowModal(!showModal)
        setSubmitted(true)
        setCount(0)
        // history.push({ pathname: '/result', state: { newData } });
    }

    return (
        <>
            {submitted ?
            <ResultHeader toggleModal={toggleModal} count={count} total={quest.length} newData={newData}/>:
            <QuizHeader toggleModal={toggleModal} count={count} total={quest.length} newData={newData}/>
            }
            {newData.length > 0 ? <QuizContainer newData={newData} count={count}
            saveResponse={saveResponse} clearResponse={clearResponse} setCount={setCount} submitted={submitted}
            /> : null}

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
