import React from 'react';
import {Button, IconButton, TrashIcon, EditIcon} from 'evergreen-ui'

const ProfileCosts =(props) => {
    
        return(
            <div className="costItem">
                    <div className="costButtonsContainer">
                        <h3 className="costDesc">{props.cost.cost_desc}</h3>
                        <div className="row">
                        <IconButton icon={EditIcon} className="costButtons" onClick={(e)=> props.renderEditCost(e,props.costId)}>Update</IconButton>
                        <IconButton icon={TrashIcon} intent="danger" className="costButtons" onClick={(e)=> props.removeCost(e,props.costId )}>Remove</IconButton>
                        </div>
                    </div>
                    <p>{props.cost.date}</p>
                    <p>${props.cost.amount}</p>
                    
            </div>
        )
    }


export default ProfileCosts;