import React, { useEffect, useState } from 'react';
import {Link, useHistory} from 'react-router-dom';
import { Button, Card, CardBody, CardHeader} from 'reactstrap';
import '../css/result.css';

const Result = (props) =>{
    // console.log("result", props.location.state?.newData)
    let history = useHistory();
    const [mark, setMark] = useState(0)
    const [notAnswered, setNotAnswered] = useState(0)
    const [wrong, setWrong] = useState(0)

    function processResponse(){
        let Tmark =0;
        let Twrong = 0;
        let TnotAnswered =0;
        props.location.state?.newData.forEach((item,i) =>{
            if(item.correct){
                Tmark += 1;
            }
            else if(item.correct === false){
                Twrong += 1;
            }
            else{
                TnotAnswered += 1;
            }
        })

        setMark(Tmark)
        setWrong(Twrong)
        setNotAnswered(TnotAnswered)
    }

    useEffect(() =>{
        processResponse();
        
    },[])

    function getClassName(res, op){
        // console.log("res", res, op)
        if(op.answer){
            return "result-option correct"
        }
        else if(res === op.id){
            return "result-option wrong"
        }
        else{
            return "result-option other"
        }
    }

    useEffect(() => {
      
        // returned function will be called on component unmount 
        return () => {
            history.goForward()
        }
      }, [])

    return(
        <>
        <div className="result-header">
            <p>Score : {mark}</p>
            <p>Wrong Answers : {wrong}</p>
            <p>Not Answered : {notAnswered}</p>
            <p>Total Question : {props.location.state?.newData.length}</p>
            <Button><Link to="/home">Home</Link></Button>
        </div>
        <div className="result-container">
        {
            props.location.state?.newData.map((item,i) =>{
                return(
                    <Card key={i} className="col-sm-9">
                        <CardHeader>
                            {item.question}
                        </CardHeader>

                        <CardBody className="">
                            {
                                item.optionArray.map((op, i) => {
                                    return (
                                        <div className={getClassName(item.responseId, op)} key={i}>
                                            <p   id="op"> {op.option} </p>
                                            {
                                                item.responseId === op.id ? <p id="mark"><i className="fa fa-user"></i></p> : null
                                            }
                                            {
                                                (item.responseId === op.id && op.answer) || op.answer ? <p id="mark"><i className="fa fa-check"></i></p> : null
                                            }
                                            {
                                                item.responseId === op.id && !op.answer ? <p id="mark"><i className="fa fa-times"></i></p> : null
                                            }
                                               
                                        </div>)
                                })
                            }
                        </CardBody>
                    </Card>
                )
            })
        }
        </div>
        </>
        
    )
}
export default Result; 