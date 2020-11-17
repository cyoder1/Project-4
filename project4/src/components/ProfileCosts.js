import React from 'react';
import {Button, IconButton, TrashIcon, EditIcon} from 'evergreen-ui'

const ProfileCosts =(props) => {
    
        return(
            <div className="costItem">
                {/* <form onClick={(e) => this.props.handleProjectSelection(e, this.props.projectId + 1)} className='projectListItem'> */}
                    {/* <h1>Project Costs</h1> */}
                    {/* <h3>{props.cost.cost_desc}</h3> */}
                    <div className="costButtonsContainer">
                        <h3 className="costDesc">{props.cost.cost_desc}</h3>
                        <div className="row">
                        <IconButton icon={EditIcon} className="costButtons" onClick={(e)=> props.renderEditCost(e,props.costId)}>Update</IconButton>
                        <IconButton icon={TrashIcon} intent="danger" className="costButtons" onClick={(e)=> props.removeCost(e,props.costId )}>Remove</IconButton>
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