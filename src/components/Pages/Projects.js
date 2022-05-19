import Wrapper from "../Helpers/Wrapper";
import data from '../../constants/raw-data.json';

import './Projects.css';
import { useState } from "react";
import Modal from "../Layout/Modal";

const Projects = () => {
    const [projects, setProjects] = useState(data);
    const [openModal, setOpenModal] = useState(false);

    const deleteRecord = projectId => {
        const newProjectsList = [...projects];
        const index = projects.findIndex(project => project.id === projectId);
        newProjectsList.splice(index, 1);
        setProjects(newProjectsList);
    };
    const errorHandler = () => {
        setOpenModal(false);
    };
    const addProjectmodal = () => {
        setOpenModal(true);
    };
    const onCheckHandler = (newProject) => {
        const newProjectsList = [...projects, newProject];
        setProjects(newProjectsList);
        console.log(projects);
    }
    return (
        <Wrapper>
            {openModal && (<Modal
                title={"Add a new project"}
                onConfirm={errorHandler}
                oncheck={onCheckHandler} />)}

            <div className="panelWrapper">
                <h1>Projects</h1>
                <div className="addprojects" onClick={addProjectmodal}>
                    <img src="./plus.svg" alt="add" />
                    <span>Add new project</span>
                </div>
                <div className="projectsList">
                    <table>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Start date</th>
                                <th>End date</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map((listdata) => (
                                <tr key={listdata.id}>
                                    <td>{listdata.title}</td>
                                    <td>{listdata.startdate}</td>
                                    <td>{listdata.enddate}</td>
                                    <td>
                                        <img src="./delete.svg" alt="Delete" onClick={event => deleteRecord(listdata.id)} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Wrapper>
    );
}

export default Projects;