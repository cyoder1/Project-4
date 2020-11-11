import React, {Component} from 'react';
import ProfileProjectsContainer from './ProfileProjectsContainer'
class Profile extends Component {
    constructor(props){
        super(props)

        this.state={

        }
    }

    render(){
        return(
            <div className="profileProjects">
                <ProfileProjectsContainer 
                    {...this.props} 
                    {...this.state} 
                    handleRemove={this.props.handleRemove} 
                    handleProjectSelection={this.props.handleProjectSelection} 
                    getProjects = {this.props.getProjects}
                /> 
            </div>
        )
    }
}

export default Profile