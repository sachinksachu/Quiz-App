import React from 'react';
import Select from 'react-select';
import Modal from 'react-modal';
import {Button, Input} from 'reactstrap';
import '../css/category.css';

import {Difficulty, Types} from "../constants/categories";


const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      
    },
  };

const ModalComponent = (props) => {
    return (
        <>
          <Modal
            isOpen={props.showModal}
            // onAfterOpen={afterOpenModal}
            onRequestClose={props.toggleModal}
            appElement={document.getElementById('root')}
            style={customStyles}
            
          >
            {
              !props.confirmModal ?
              <div className="modalForm">
                  
                    <Input type="text" placeholder="Number of Questions" 
                    id="modalInput" onChange={props.handleChange}
                    value={props.fields.amount}
                    name="amount"/>
                    <Select 
                      onChange={props.handleChange}
                       id="modalInput"
                       options={Difficulty}
                       placeholder="Choose Difficulty"
                       name="difficulty"
                    />
                    <Select 
                      onChange={props.handleChange}
                       id="modalInput"
                       options={Types}
                       placeholder="Type"
                       name="type"
                    />

                    <Button id="modalInput" color="primary" onClick={props.startQuiz}>Start</Button>
                  
              </div> :
              <div className="modalForm">
                <span>Are You sure want to submit?</span>
                <br/>
                <Button id="modalInput" color="primary" onClick={props.submitQuiz}>Yes</Button>
              </div>
            }
              
          </Modal>
        </>
      );
}

export default ModalComponent;