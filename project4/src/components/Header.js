import React from 'react';
import {Link} from 'react-router-dom';
import Home from './Home';

function Header(props) {
    return (
        <div>
            <header>
                <Link className="AppTitle" to="/">Project Manager</Link>
                
                <nav className="logout">
                    {props.loggedInUser && <button className="logoutButton" onClick={(e) => props.handleLogout(e) }>Logout</button>}
                </nav> 
                
            </header> 

            {/* <nav>
                <Home {...props}/>    
            </nav>            */}
        </div>

    )
}

export default Header;