import React, {Component} from'react';
import ProfileProjects from './ProfileProjects';
import { indexPosts, postProject, putProject, destroyPost } from '../services/api_helper';
import {withRouter} from "react-router-dom";


class ProfileProjectsContainer extends Component {
    constructor(props){
        super(props)

        this.state = {
            project_name: "",
            class:"",
            description: "",
            img: "",
            newPage: true
        }
    }

    createProject = async (e, projectData, id) => {
        e.preventDefault()
        // console.log("create project")
        const newProject = await postProject(projectData, id);
        // console.log(newProject);
        // const projects = this.props.userProjects;
        // console.log(projects)
        // const newProjects = {...projects, newProject};
        // console.log(newProjects)
        console.log(this.props.userProjects)
        this.setState({
            // projects: newProjects,
            id: "",
            project_name: "",
            class:"",
            description: "",
            img: ""
        })
        await this.props.getProjects(this.props.loggedInUser.id);
        this.props.history.push('/profile')
        console.log(this.props.userProjects)
    }

    updateProject = async (e, projectData, id) => {
        e.preventDefault();
        console.log(projectData)
        console.log(this.state.id)
        console.log(this.props.userProjects)
        const updatedProject = await putProject(this.state.id, projectData);
        const projects = this.props.userProjects;
        const newProjects = projects.map(project => project.id === parseInt(id) ? updatedProject : project);
        this.setState({
            projects: newProjects
        })
        this.props.history.push('/profile');
        await this.props.getProjects(this.props.loggedInUser.id);
        console.log(this.props.userProjects)
    }

    renderEdit =(e, id) => {
        e.preventDefault()
        console.log(this.props.userProjects[id])
        const project_name = (this.props.userProjects[id].project_name)
        const description = this.props.userProjects[id].description
        const class1 = this.props.userProjects[id].class
        const img = this.props.userProjects[id].img
        const id1 = id+1
        const newPage = false
        this.setState({
            project_name,
            description,
            class: class1,
            img,
            newPage,
            id: id1
        })
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
                        renderEdit={this.renderEdit}
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
                {this.state.newPage === true &&
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
                }
                {!this.state.newPage === true &&
                    <div>
                        <h2>Update your project</h2>
                        <form onSubmit={(e) => this.updateProject(e, this.state, this.props.userProjects[this.state.id].id)}>
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
                        <input type="submit" value="Update project" />
                    </form>
                    </div>  
                }
                {/* <button onClick={() => this.props.getProjects( this.props.loggedInUser.id)}>List of Projects</button>  */}
                {/* <div>{this.props.projects}</div>             */}
            </div>
        )
    }
}
export default withRouter(ProfileProjectsContainer);