import React from 'react';

const ProfileCosts =(props) => {
    
        return(
            <div>
                {/* <form onClick={(e) => this.props.handleProjectSelection(e, this.props.projectId + 1)} className='projectListItem'> */}
                    {/* <h1>Project Costs</h1> */}
                    <h2>{props.cost.cost_desc}</h2>
                    <p>${props.cost.amount}</p>
                    <p>{props.cost.date}</p>
                    <button onClick={(e)=> props.removeCost(e,props.costId )}>Remove</button>
                    <button onClick={(e)=> props.renderEditCost(e,props.costId)}>Update</button>
                {/* </form>  */}
                {/* {this.props.selected && <div className='selectedProject'>
                    <p>Your project info goes here</p>
                </div>} */}
            </div>
        )
    }


export default ProfileCosts;