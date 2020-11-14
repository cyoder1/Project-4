import React, {Component} from'react';
import ProfileProjects from './ProfileProjects';
import ProfileCosts from './ProfileCosts';
import { indexPosts, postProject, putProject, destroyProject } from '../services/api_helper';
import {withRouter} from "react-router-dom";


class ProfileProjectsContainer extends Component {
    constructor(props){
        super(props)

        this.state = {
            project_name: "",
            class:"",
            description: "",
            img: "",
            newPage: true,
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
        console.log(id)
        console.log(this.state)
        console.log(this.props.userProjects)
        console.log(this.props.userProjects[this.state.selected])
        const updatedProject = await putProject(id, projectData);
        const projects = this.props.userProjects;
        const newProjects = projects.map(project => project.id === parseInt(id) ? updatedProject : project);
        const newPage = true
        this.setState({
            projects: newProjects,
            newPage,
            id: "",
            project_name: "",
            class:"",
            description: "",
            img: ""
        })
        this.props.history.push('/profile');
        await this.props.getProjects(this.props.loggedInUser.id);
        console.log(this.props.userProjects)
        console.log(newPage)
    }

    renderEdit =(e, id) => {
        e.preventDefault()
        console.log(this.props.userProjects[id].id)
        const project_name = (this.props.userProjects[id].project_name)
        const description = this.props.userProjects[id].description
        const class1 = this.props.userProjects[id].class
        const img = this.props.userProjects[id].img
        const id1 = this.props.userProjects[id].id
        const newPage = false
        this.setState({
            project_name,
            description,
            class: class1,
            img,
            newPage,
            id: id1,
            selected: null,
            click: true,
        })
    }

    removeProject = async (e, id) => {
        e.preventDefault()
        console.log(id)
        console.log(this.props.loggedInUser)
        console.log(this.props.userProjects[id].id)
        await destroyProject(this.props.userProjects[id].id, this.props.loggedInUser);
        const projects = this.props.userProjects;
        // const filterProjects = projects.filter(project => project.id !== parseInt(id));
        // console.log(projects[id])
        this.setState({
            // projects: filterProjects,
            click: false
        })
        await this.props.getProjects(this.props.loggedInUser.id);
        this.props.history.push('/profile');
    }

    handleProjectSelection = (e, pick) => {
        e.preventDefault()
          e.preventDefault()
        //   console.log(pick - 1)
          console.log(this.props.userProjects)
          // console.log("Selected!!!")
          let selected = pick-1
          this.setState({
            selected,
            click:true
          })
          console.log(selected)
          console.log(this.props.userProjects[selected])
          // this.setState({click: false})
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
        // console.log(this.state)
        return(
            <div>
                {this.props.loggedInUser && 
                <h1>My Projects {this.props.loggedInUser.name} </h1>}
                {this.props.userProjects && this.props.userProjects.map((project, id) => {
                    return (<ProfileProjects
                        removeProject = {this.removeProject} 
                        handleProjectSelection={this.handleProjectSelection} 
                        renderEdit={this.renderEdit}
                        selected = {this.state.selected}
                        userProjects = {this.props.userProjects}
                        project={project} 
                        key={id} 
                        projectId = {id} />)
                })}
                {this.state.click && <div className='selectedProject'>
                        <p>{this.props.userProjects[this.state.selected].project_name}</p>
                        <p>{this.props.userProjects[this.state.selected].class}</p>
                        <p>{this.props.userProjects[this.state.selected].description}</p>
                        <img src={this.props.userProjects[this.state.selected].img} />
                    {this.props.userCosts && this.props.userCosts.map((cost, id) => {
                            return (<ProfileCosts
                                // removeCost = {this.removeCost} 
                                // handleProjectSelection={this.handleProjectSelection} 
                                // renderEdit={this.renderEdit}
                                selected = {this.state.selected}
                                userProjects = {this.props.userProjects}
                                userCosts = {this.props.userCosts}
                                cost={cost} 
                                key={id} 
                                costId = {id} />)
                        })}
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
                        <textarea
                            type="textbox"
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
                        <form onSubmit={(e) => this.updateProject(e, this.state, this.props.userProjects[this.state.selected].id)}>
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
                        <textarea
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
                <button onClick={() => this.props.getCosts( this.props.userProjects[this.state.selected].id)}>List of Costs</button> 
                {/* <div>{this.props.projects}</div>             */}
            </div>
        )
    }
}
export default withRouter(ProfileProjectsContainer);