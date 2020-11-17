import React, {Component} from 'react';
import {Button, IconButton, TrashIcon, EditIcon} from 'evergreen-ui'

class ProfileProjects extends Component {
    constructor(props){
        super(props);

        this.state={
        }
    }

    render() {
        return(
            <div className="projectSelectOptions">
                
                <form onClick={(e) => this.props.handleProjectSelection(e, this.props.projectId + 1)} className='projectListItem'>
                    <div className="projectSelectionContent">
                        <h2>{this.props.project.project_name}</h2>
                        <p>{this.props.project.class}</p>
                    </div>
                    <div className="projectSelectionButtons">
                        <IconButton icon={EditIcon} onClick={(e)=> this.props.renderEdit(e,this.props.projectId)}>Update</IconButton>
                        <IconButton  icon={TrashIcon} intent="danger" onClick={(e)=> this.props.removeProject(e,this.props.projectId )}>Remove</IconButton>
                    </div>
                </form> 
            </div>
        )
    }
}

export default ProfileProjects;