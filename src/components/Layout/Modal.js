import React, { Fragment, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

import Button from "../UI/Button";
import DatePicker from "react-datepicker";
import data from '../../constants/raw-data.json';

import Card from "../UI/Card";
import classes from './Modal.module.css';
import "react-datepicker/dist/react-datepicker.css";

const Backdrop = (props) => {
    return <div className={classes.backdrop} onClick={props.onConfirm} />;
};

const ModalOverlay = (props) => {
    const [projects, setProjects] = useState(data);

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const titleRef = useRef();

    const addProjectHandler = event => {
        event.preventDefault();
        const enteredTitle = titleRef.current.value;

        const newProject = {
            id: projects.length + 1,
            title: enteredTitle,
            startdate: startDate.getDate() + "/" + startDate.getMonth() + "/" + startDate.getFullYear(),
            enddate: endDate.getDate() + "/" + endDate.getMonth() + "/" + endDate.getFullYear(),
        }
        // const newProjectsList = [...projects, newProject];
        props.oncheck(newProject);
        props.onConfirm();
        // setProjects(newProjectsList);
        
    };
    return (
        <Card className={classes.modal}>
            <header className={classes.header}>
                <h2>{props.title}</h2>
            </header>
            <div className={classes.content}>
                <form onSubmit={addProjectHandler}>
                    <div className={classes.formgroup}>
                        <label htmlFor="title">Title</label>
                        <input
                            id="title"
                            type="text"
                            ref={titleRef} />
                    </div>
                    <div className={classes.formgroup}>
                        <label htmlFor="startdate">Start date</label>
                        <DatePicker
                            selected={startDate}
                            minDate={startDate}
                            onChange={date => setStartDate(date)}
                        />
                    </div>
                    <div className={classes.formgroup}>
                        <label htmlFor="dendate">End date</label>
                        <DatePicker
                            selected={endDate}
                            minDate={endDate}
                            onChange={date => setEndDate(date)}
                        />
                    </div>
                    <footer className={classes.actions}>
                        <Button type={'submit'}>Create</Button>
                    </footer>
                </form>
            </div>

        </Card>
    );
};

const Modal = (props) => {
    return (
        <Fragment>
            {ReactDOM.createPortal(
                <Backdrop onConfirm={props.onConfirm} />,
                document.getElementById('backdrop-root')
            )}
            {ReactDOM.createPortal(
                <ModalOverlay
                    title={props.title}
                    onConfirm={props.onConfirm}
                    oncheck={props.oncheck}
                />,
                document.getElementById('overlay-root')
            )

            }
        </Fragment>
    )
};

export default Modal;