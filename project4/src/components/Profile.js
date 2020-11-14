import React, {Component} from 'react';
import ProfileProjectsContainer from './ProfileProjectsContainer'
class Profile extends Component {
    constructor(props){
        super(props)

        this.state={

        }
    }

    componentDidMount() {
        this.props.handleVerify();
      }

    render(){
        return(
            <div className="profileProjects">
                <ProfileProjectsContainer 
                    {...this.props} 
                    {...this.state} 
                    handleRemove={this.props.handleRemove} 
                    handleProjectSelection={this.props.handleProjectSelection} 
                    handleVerify = {this.props.handleVerify}
                    getProjects = {this.props.getProjects}
                    getCosts = {this.props.getCosts}
                /> 
            </div>
        )
    }
}

export default Profile