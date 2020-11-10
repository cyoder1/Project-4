import React from'react';
import ProfileProjects from './ProfileProjects';

const ProfileProjectsContainer = (props) => {

    return(
        <div>
            <h1>My Projects</h1>
            {props.loggedInUser.userProjects.map((project, id) => {
                return (<ProfileProjects
                    handleRemove = {props.handleRemove} 
                    handleProjectSelection={props.handleProjectSelection} 
                    project={project} 
                    key={id} 
                    projectId = {id} />)
            })}                
        </div>
    )
}

export default ProfileProjectsContainer;