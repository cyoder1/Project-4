import React from 'react';
import {Link} from 'react-router-dom';
import Home from './Home';
import {Button} from 'evergreen-ui'


function Header(props) {
    return (
        <div>
            <header>
                <Link className="AppTitle" to="/">Hay Down</Link>
                
                <nav className="logout">
                    {props.loggedInUser && <Button appearance="primary" className="logoutButton" onClick={(e) => props.handleLogout(e) }>Logout</Button>}
                </nav> 
                
            </header> 

            {/* <nav>
                <Home {...props}/>    
            </nav>            */}
        </div>

    )
}

export default Header;