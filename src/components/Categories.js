import React, { useState, useEffect } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { Card, CardText} from 'reactstrap';

import '../css/category.css';

import { Quiz_Categories } from "../constants/categories";
import ModalComponent from "./Modal";

import { connect, useSelector, useDispatch } from 'react-redux';
import { fetchQuizAndOptions } from '../redux/fetchQuiz';

import { useFormFields } from "../libs/customForm";


const Categories = () => {


    const [showModal, setShowModal] = useState(false)
    const [redirect, setRedirect] = useState(false)
    const [categoryId, setCategoryId] = useState("")

    let history = useHistory();

    const [fields, handleFieldChange] = useFormFields({
        amount: 10,
        difficulty: "",
        type: "",
    });

    const dispatch = useDispatch();
    const quiz_props = useSelector(state => state.quiz)

    useEffect((props) => {
        if (redirect && quiz_props.data?.results?.length > 0) {
            let data = quiz_props.data.results;
            history.push({ pathname: '/quiz', state: { data } });
        }

        // setRedirect(false)

    }, [quiz_props, history, redirect])

    useEffect(() => {
        dispatch(fetchQuizAndOptions(fields, categoryId))
        console.log("klkl");
    }, [categoryId])

    const Category = () => {
        return (
            Quiz_Categories.map((items) => {
                return (

                    <Card className="col-12 col-sm-3 col-md-3 Category-card" onClick={() => toggleModal(items.id)} key={items.id}>
                        <CardText>{items.value}</CardText>
                        <span className={items.icon || " "}></span>
                    </Card>

                )

            })

        )
    }

    const toggleModal = (id) => {
        setShowModal(!showModal)
        setCategoryId(id)
    }

    const startQuiz = async (e) => {
        setRedirect(true)
        setShowModal(!showModal)
    }

    return (
        <>
            <div className="Category-container">
                <Category />
            </div>
            {
                <ModalComponent showModal={showModal} toggleModal={toggleModal}
                    handleChange={handleFieldChange} fields={fields} startQuiz={startQuiz} confirmModal={false}/>
            }
        </>
    )

}

export default withRouter(Categories);