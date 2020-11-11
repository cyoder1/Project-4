import React, {Component} from'react';
import ProfileProjects from './ProfileProjects';

const ProfileProjectsContainer = (props) => {
    console.log(props.userProjects)
    return(
        <div>
            
            <h1>My Projects</h1>
            {props.userProjects && props.userProjects.map((project, id) => {
                return (<ProfileProjects
                    handleRemove = {props.handleRemove} 
                    handleProjectSelection={props.handleProjectSelection} 
                    selected = {props.selected}
                    project={project} 
                    key={id} 
                    projectId = {id} />)
            })}
            {props.selected && <div className='selectedProject'>
                    <p>{props.loggedInUser.userProjects[props.selected-1].name}</p>
                </div>}   
            <button onClick={() => props.getProjects( props.loggedInUser.id)}>List of Projects</button> 
            {/* <div>{props.projects}</div>             */}
        </div>
    )
}

export default ProfileProjectsContainer;