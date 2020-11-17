import React from 'react';

const ProfileCosts =(props) => {
    
        return(
            <div className="costItem">
                {/* <form onClick={(e) => this.props.handleProjectSelection(e, this.props.projectId + 1)} className='projectListItem'> */}
                    {/* <h1>Project Costs</h1> */}
                    {/* <h3>{props.cost.cost_desc}</h3> */}
                    <div className="costButtonsContainer">
                        <h3 className="costDesc">{props.cost.cost_desc}</h3>
                        <div className="row">
                        <button className="costButtons" onClick={(e)=> props.renderEditCost(e,props.costId)}>Update</button>
                        <button className="costButtons" onClick={(e)=> props.removeCost(e,props.costId )}>Remove</button>
                        </div>
                    </div>
                    <p>{props.cost.date}</p>
                    <p>${props.cost.amount}</p>
                    
                {/* </form>  */}
                {/* {this.props.selected && <div className='selectedProject'>
                    <p>Your project info goes here</p>
                </div>} */}
            </div>
        )
    }


export default ProfileCosts;