import React, {Component} from 'react';

class ProfileProjects extends Component {
    constructor(props){
        super(props);

        this.state={
        }
    }

    render() {
        return(
            <div>
                <form onClick={(e) => this.props.handleProjectSelection(e, this.props.projectId+1)} className='projectListItem'>
                    <h2>{this.props.project.name}</h2>
                    <p>{this.props.project.class}</p>
                    <button onClick={()=> this.props.handleRemove(this.props.projectId, true)}>Remove</button>
                </form>
                {/* {this.props.selected && <div className='selectedProject'>
                    <p>Your project info goes here</p>
                </div>} */}
            </div>
        )
    }
}

export default ProfileProjects;