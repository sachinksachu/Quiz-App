import React,{useEffect,useState} from 'react';
import {Link} from 'react-router-dom';
import { Button, Card,CardHeader} from 'reactstrap';
import '../css/quizTemplate.css';

const ResultHeader = (props) =>{

    const [mark, setMark] = useState(0)
    const [notAnswered, setNotAnswered] = useState(0)
    const [wrong, setWrong] = useState(0)
    function processResponse(){
        console.log("inside")
        let Tmark =0;
        let Twrong = 0;
        let TnotAnswered =0;
        props.newData.forEach((item,i) =>{
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
    return(
        <div className="quiz-header">
        <Card>
            <CardHeader>
            <div className="result-header">
            <p>Score : {mark}</p>
            <p>Wrong Answers : {wrong}</p>
            <p>Not Answered : {notAnswered}</p>
            <p>Total Question : {props.newData.length}</p>
            <Link to="/home"><i className="fa fa-home fa-2x"></i></Link>
        </div>
            </CardHeader>
        </Card>
        </div>
    )
}
export default ResultHeader; 