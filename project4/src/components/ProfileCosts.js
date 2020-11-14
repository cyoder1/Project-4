import React from 'react';

const ProfileCosts =(props) => {
    
        return(
            <div>
                {/* <form onClick={(e) => this.props.handleProjectSelection(e, this.props.projectId + 1)} className='projectListItem'> */}
                    <h1>Project Costs</h1>
                    <h2>{props.cost.cost_desc}</h2>
                    <p>${props.cost.amount}</p>
                    <p>{props.cost.date}</p>
                    {/* <button onClick={(e)=> this.props.removeProject(e,this.props.projectId )}>Remove</button>
                    <button onClick={(e)=> this.props.renderEdit(e,this.props.projectId)}>Update</button> */}
                {/* </form>  */}
                {/* {this.props.selected && <div className='selectedProject'>
                    <p>Your project info goes here</p>
                </div>} */}
            </div>
        )
    }


export default ProfileCosts;