import React from 'react'
import { Link } from 'react-router-dom'

export class Sidebar extends React.Component {
    render () {
        return (
            <div className="left-sidebar">
                <div className="slimScrollDiv">
                    <div className="scroll-sidebar">
                        <nav className="sidebar-nav">
                            <ul id="sidebarnav">
                                <li className="nav-devider"></li>
                                <li className="nav-label">Home</li>
                                <li>
                                    <Link to='/' aria-expanded={false}><i className="fa fa-tachometer"></i>
                                        <span className="hide-menu">Dashboard </span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/events' aria-expanded={false}><i className="fa fa-bullhorn"></i>
                                        <span className="hide-menu">Events </span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/raffles' aria-expanded={false}><i className="fa fa-tags"></i>
                                        <span className="hide-menu">Raffles </span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/users' aria-expanded={false}><i className="fa fa-users"></i>
                                        <span className="hide-menu">Users </span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/bartolos' aria-expanded={false}><i className="fa fa-reddit-alien"></i>
                                        <span className="hide-menu">Bartolos </span>
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        )
    }
}
