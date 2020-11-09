import React, {Component} from 'react';

class ProfileProjects extends Component {
    constructor(props){
        super(props);

        this.state={
        }
    }

    render() {
        return(
            <div className='projectList'>
                <h2>{this.props.project.name}</h2>
                <p>{this.props.project.class}</p>
                <button onClick={()=> this.props.handleRemove(this.props.projectId, true)}>Remove</button>
            </div>
        )
    }
}

export default ProfileProjects;