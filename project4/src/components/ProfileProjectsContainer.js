import React, {Component} from'react';
import ProfileProjects from './ProfileProjects';

class ProfileProjectsContainer extends Component {
    constructor(props){
        super(props)
    }

    componentDidMount = async () => {
        await this.props.handleVerify();
        await this.props.getProjects(this.props.loggedInUser.id);
      }

    

    render(){
        console.log(this.props.userProjects)
        return(
            <div>
                {this.props.loggedInUser && 
                <h1>My Projects {this.props.loggedInUser.name} </h1>}
                {this.props.userProjects && this.props.userProjects.map((project, id) => {
                    return (<ProfileProjects
                        handleRemove = {this.props.handleRemove} 
                        handleProjectSelection={this.props.handleProjectSelection} 
                        selected = {this.props.selected}
                        project={project} 
                        key={id} 
                        projectId = {id} />)
                })}
                {this.props.selected && <div className='selectedProject'>
                        <p>{this.props.loggedInUser.userProjects[this.props.selected-1].name}</p>
                    </div>}   
                {/* <button onClick={() => this.props.getProjects( this.props.loggedInUser.id)}>List of Projects</button>  */}
                {/* <div>{this.props.projects}</div>             */}
            </div>
        )
    }
}
export default ProfileProjectsContainer;