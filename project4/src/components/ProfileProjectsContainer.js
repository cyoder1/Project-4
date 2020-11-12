import React, {Component} from'react';
import ProfileProjects from './ProfileProjects';
import { indexPosts, postProject, putPost, destroyPost } from '../services/api_helper';
import {withRouter} from "react-router-dom";


class ProfileProjectsContainer extends Component {
    constructor(props){
        super(props)

        this.state = {
            project_name: "",
            class:"",
            description: "",
            img: ""
        }
    }

    createProject = async (e, projectData, id) => {
        e.preventDefault()
        console.log("create project")
        const newProject = await postProject(projectData, id);
        console.log(newProject);
        const projects = this.state.projects;
        const newProjects = {...projects, newProject};
        this.setState({
            projects: newProjects
        })
        await this.props.getProjects(this.props.loggedInUser.id);
        this.props.history.push('/profile')
    }

    componentDidMount = async () => {
        await this.props.handleVerify();
        await this.props.getProjects(this.props.loggedInUser.id);
        
      }

    updateForm = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    })
    }

    render(){
        // console.log(this.props.loggedInUser.id)
        // console.log(this.props.userProjects)
        return(
            <div>
                {this.props.loggedInUser && 
                <h1>My Projects {this.props.loggedInUser.name} </h1>}
                {this.props.userProjects && this.props.userProjects.map((project, id) => {
                    return (<ProfileProjects
                        handleRemove = {this.props.handleRemove} 
                        handleProjectSelection={this.props.handleProjectSelection} 
                        selected = {this.props.selected}
                        userProjects = {this.props.userProjects}
                        project={project} 
                        key={id} 
                        projectId = {id} />)
                })}
                {this.props.selected && <div className='selectedProject'>
                        <p>{this.props.userProjects[this.props.selected-1].project_name}</p>
                        <p>{this.props.userProjects[this.props.selected-1].class}</p>
                        <p>{this.props.userProjects[this.props.selected-1].description}</p>
                        <img src={this.props.userProjects[this.props.selected-1].img} />
                    </div>} 
                <div>
                    <h2>Add a new project</h2>
                    <form onSubmit={(e) => this.createProject(e, this.state, this.props.loggedInUser.id)}>
                    <input
                        type="text"
                        name="project_name"
                        placeholder="Enter your project name"
                        value={this.state.project_name}
                        onChange={this.updateForm}
                    />
                    <input
                        type="text"
                        name="class"
                        placeholder="project class type (ex, woodworking, automotive, etc."
                        value={this.state.class}
                        onChange={this.updateForm}
                    />
                    <input
                        type="text"
                        name="description"
                        placeholder="Project description"
                        value={this.state.description}
                        onChange={this.updateForm}
                    />
                    <input
                        type="text"
                        name="img"
                        placeholder="Image Url"
                        value={this.state.img}
                        onChange={this.updateForm}
                    />
                    <input type="submit" value="Add new project" />
                </form>
                </div>  
                {/* <button onClick={() => this.props.getProjects( this.props.loggedInUser.id)}>List of Projects</button>  */}
                {/* <div>{this.props.projects}</div>             */}
            </div>
        )
    }
}
export default withRouter(ProfileProjectsContainer);