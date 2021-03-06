import React, {Component} from'react';
import ProfileProjects from './ProfileProjects';
import ProfileCosts from './ProfileCosts';
import { indexPosts, postProject, putProject, destroyProject ,postCost, putCost, destroyCost } from '../services/api_helper';
import {withRouter} from "react-router-dom";
import emailjs from'emailjs-com';

class ProfileProjectsContainer extends Component {
    constructor(props){
        super(props)

        this.state = {
            project_name: "",
            class:"",
            description: "",
            img: "",
            newPage: true,
            cost_desc: "",
            date: "",
            amount: null,
            selected: null,
            newLineItem: true,
            selectedCost: null,
            totalCost: null,
            emailName: "",
            emailNumber:"",
            emailEmail: "",
            emailInfo: "",
        }
    }

    //called to create a user project and push it to database
    createProject = async (e, projectData, id) => {
        e.preventDefault()
        // console.log("create project")
        const newProject = await postProject(projectData, id);
        console.log(this.props.userProjects)
        this.setState({
            id: "",
            project_name: "",
            class:"",
            description: "",
            img: "",
            cost_desc: "",
            date: "",
            amount: null
        })
        await this.props.getProjects(this.props.loggedInUser.id);
        this.props.history.push('/profile')
        console.log(this.props.userProjects)
    }

    //allows user to update a current project and save those changes to the database
    updateProject = async (e, projectData, id) => {
        e.preventDefault();
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

    //function displays the edit form for users to modify their projects
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
//destroys a users project from the database upon being called
    removeProject = async (e, id) => {
        e.preventDefault()
        await destroyProject(this.props.userProjects[id].id, this.props.loggedInUser);
        const projects = this.props.userProjects;
        this.setState({
            click: false
        })
        await this.props.getProjects(this.props.loggedInUser.id);
        this.props.history.push('/profile');
    }
//allows user to select a project and display the information on the page
    handleProjectSelection = async (e, pick) => {
        e.preventDefault()
        //   console.log(pick - 1)
        //   console.log(this.props.userProjects)
          // console.log("Selected!!!")
        //   let selected = pick-1
          if (this.state.selected === pick-1) {
            const click = !this.state.click
          this.setState({
            // selected,
            click
          })
        } else {
            let selected = pick-1
            this.setState({
                selected,
                click: true
            })
        }
          console.log(this.state.selected)
          console.log(this.props.userProjects[this.state.selected])
          await this.props.getCosts( this.props.userProjects[pick-1].id)
          await this.runTotal()
      }
    //===================COST FUNCTIONS =======================================================================================================================
    createCost = async (e, costData, id) => {
        e.preventDefault()
        console.log(id)
        console.log(this.props.userCosts)
        const newCost = await postCost(costData, id);
        this.setState({
            cost_desc: "",
            date: "",
            amount: 0,
        })
    //     this.props.history.push('/posts')
        await this.props.getCosts(this.props.userProjects[this.state.selected].id);
        await this.runTotal()
            this.props.history.push('/profile')
    }

    renderEditCost =(e, id) => {
        e.preventDefault()
        console.log(this.props.userCosts[id].id)
        console.log(this.props.userCosts[id].cost_desc)
        const cost_desc = (this.props.userCosts[id].cost_desc)
        const date = this.props.userCosts[id].date
        const amount = this.props.userCosts[id].amount
        const newLineItem = false
        const selectedCost= id
        this.setState({
            cost_desc: cost_desc,
            date,
            amount,
            newLineItem,
            selectedCost
        })
        console.log(this.state)
    }

    updateCost = async (e, costData, id) => {
        e.preventDefault();
        console.log(id)
        console.log(costData)
        console.log(this.props.userCosts)
        console.log(this.props.userCosts[id])
        const updatedCost = await putCost(id, costData);
        const costs = this.props.userCosts;
        const newCosts = costs.map(cost => cost.id === parseInt(id) ? updatedCost : cost);
        const newLineItem = true
        this.setState({
            costs: newCosts,
            newLineItem,
            cost_desc: "",
            date: "",
            amount: null
        })
        this.props.history.push('/profile');
        await this.props.getProjects(this.props.loggedInUser.id);
        await this.props.getCosts( this.props.userProjects[this.state.selected].id)
        console.log(this.props.userProjects)
        // console.log(newPage)
    }

    removeCost = async (e, id) => {
        e.preventDefault()
        console.log(this.props.userCosts[id].id)
        console.log(this.props.userProjects[this.state.selected].id)
        console.log(id)
        console.log(this.props.loggedInUser)
        await destroyCost(this.props.userCosts[id].id, this.props.userProjects[this.state.selected]);
        const projects = this.props.userProjects;
        this.setState({
            // projects: filterProjects,
            // click: false
        })
        // await this.props.getProjects(this.props.loggedInUser.id);
        await this.props.getCosts( this.props.userProjects[this.state.selected].id)
        await this.runTotal()
        console.log(this.props.userCosts)
        this.props.history.push('/profile');
    }

    //function used to total all cost items in the user's selected project
    runTotal = async () => {
        const items = this.props.userCosts;
        let tot = 0
        for (let i=0 ; i < items.length ; i++){
            console.log(items[i].amount)
            tot = tot + parseFloat(items[i].amount)
        }
        tot = tot.toFixed(2)
        console.log(tot)
        this.setState({
            totalCost: tot
        }, () => {console.log(this.state.totalCost)})
        console.log(this.state)
    }

    //===============================Email============================================================

    sendEmail = (e) => {
        e.preventDefault();
        emailjs.sendForm('service_hrvmep6', 'template_5ugw2uq', e.target, 'user_o0kaVRJrd4Jtl7pnhXUGz')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
        });
        // 
        this.setState({
            emailName: '',
            emailNumber:"",
            emailEmail: "",
            emailInfo: "",
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
        return(
            <div>
                {this.props.loggedInUser && 
                <h1 className="userProjectsTitle"> {this.props.loggedInUser.name}'s Projects </h1>}
                <div className="profileContent">
                    <div className="projectSelectionList">
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
                        {this.state.newPage === true &&
                            <div className="add">
                                <h2>Add a new project</h2>
                                    <div className="inputStacks">
                                        <form onSubmit={(e) => this.createProject(e, this.state, this.props.loggedInUser.id)}>
                                            <input
                                                type="text"
                                                name="project_name"
                                                placeholder="Enter your project name"
                                                value={this.state.project_name}
                                                onChange={this.updateForm}
                                            /><br></br>
                                            <input
                                                type="text"
                                                name="class"
                                                placeholder="project class type (ex, woodworking, automotive, etc."
                                                value={this.state.class}
                                                onChange={this.updateForm}
                                            /><br></br>
                                            <textarea
                                                type="textbox"
                                                name="description"
                                                placeholder="Project description"
                                                value={this.state.description}
                                                onChange={this.updateForm}
                                            /><br></br>
                                            <input
                                                type="text"
                                                name="img"
                                                placeholder="Image Url"
                                                value={this.state.img}
                                                onChange={this.updateForm}
                                            /><br></br>
                                            <input type="submit" value="Add new project" />
                                    </form>
                                </div>
                            </div>  
                        }
                    </div>
                    <div className="profileContentRight">
                        {this.state.click && <div className='selectedProject'>
                                <h1>{this.props.userProjects[this.state.selected].project_name}</h1>
                                <p>Class: {this.props.userProjects[this.state.selected].class}</p>
                                <p>Description and updates: {this.props.userProjects[this.state.selected].description}</p>
                                <img className="projImg" src={this.props.userProjects[this.state.selected].img} />
                                    {!this.state.newPage === true &&
                                        <div className="edit1">
                                            <h2>Update your project</h2>
                                            <div className="inputStacks">
                                                <form className = "inputStacks" onSubmit={(e) => this.updateProject(e, this.state, this.props.userProjects[this.state.selected].id)}>
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
                                        </div>  
                                    }
                            <h1>Project Expenses</h1>
                            {this.props.userCosts && this.props.userCosts.map((cost, id) => {
                                    return (
                                    <div className="mapExpenses">
                                            <ProfileCosts key={id}
                                            renderEditCost={this.renderEditCost}
                                            removeCost = {this.removeCost}
                                            selected = {this.state.selected}
                                            userProjects = {this.props.userProjects}
                                            userCosts = {this.props.userCosts}
                                            cost={cost} 
                                            key={id} 
                                            costId={id} />
                                    </div>)
                                })}
                                <div className="total">
                                    {this.state.totalCost && <p>Total project investment: ${this.state.totalCost}</p>}
                                </div>

                                    {this.props.userCosts && this.state.newLineItem ===true && <div className="add">
                                        <h2>Add new expense</h2>
                                        <form onSubmit={(e) => this.createCost(e, this.state, this.props.userProjects[this.state.selected].id)}>
                                            <input
                                                type="text"
                                                name="cost_desc"
                                                placeholder="Enter your expense description"
                                                value={this.state.cost_desc}
                                                onChange={this.updateForm}
                                            />
                                            <input
                                                type="text"
                                                name="date"
                                                placeholder="date"
                                                value={this.state.date}
                                                onChange={this.updateForm}
                                            />
                                            <input
                                                type="number"
                                                step=".01"
                                                name="amount"
                                                placeholder="expense amount"
                                                value={this.state.amount}
                                                onChange={this.updateForm}
                                            />
                                            <input type="submit" value="Add new expense" />
                                        </form>
                                    </div>}

                                    {this.props.userCosts && !this.state.newLineItem ===true && <div className="edit">
                                        <h2>Edit expense</h2>
                                        <form onSubmit={(e) => this.updateCost(e, this.state, this.props.userCosts[this.state.selectedCost].id)}>
                                            <input
                                                type="text"
                                                name="cost_desc"
                                                placeholder="Enter your expense description"
                                                value={this.state.cost_desc}
                                                onChange={this.updateForm}
                                            />
                                            <input
                                                type="text"
                                                name="date"
                                                placeholder="date"
                                                value={this.state.date}
                                                onChange={this.updateForm}
                                            />
                                            <input
                                                type="number"
                                                step=".01"
                                                name="amount"
                                                placeholder="expense amount"
                                                value={this.state.amount}
                                                onChange={this.updateForm}
                                            />
                                            <input type="submit" value="Update expense" />
                                        </form>
                                    </div>}
                            </div>} 
                    </div>
                    </div>
                    <div className='emailInfo'>
                        <h2>Stuck on a project? Please provide your information below and we'll get back to you with help!</h2>
                            <div className="emailInput">
                                <form onSubmit={(e) => this.sendEmail(e)}>
                                    <input
                                        type="text"
                                        name="emailName"
                                        placeholder="Enter your name"
                                        value={this.state.emailName}
                                        onChange={this.updateForm}
                                    /><br></br>
                                    <input
                                        type="text"
                                        name="emailNumber"
                                        placeholder="phone number"
                                        value={this.state.emailNumber}
                                        onChange={this.updateForm}
                                    /><br></br>
                                    <input
                                        type="text"
                                        name="emailEmail"
                                        placeholder="email"
                                        value={this.state.emailEmail}
                                        onChange={this.updateForm}
                                    /><br></br>
                                    <textarea
                                        type="text"
                                        name="emailInfo"
                                        placeholder="your questions or comments"
                                        value={this.state.emailInfo}
                                        onChange={this.updateForm}
                                    /><br></br>
                                    <input type="submit" value="Send" />
                                </form>
                            </div>
                        </div>
                    
            </div>
        )
    }
}
export default withRouter(ProfileProjectsContainer);