import React from 'react'

import logo from '../assets/logo.svg'
import logoText from '../assets/logo-text.svg'
import UserMenu from './UserMenu'
import './Header.css'

export class Header extends React.Component {

    menuToggle (ev) {
        ev.preventDefault()
        this.props.onShowMenu(!this.props.menuVisible)
    }

    render () {
        const logoTextStyle = this.props.menuVisible ? {} : { display: 'none' }

        return (
            <div className="header">
                <nav className="navbar top-navbar navbar-expand-md navbar-light">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="index.html">
                            <b><img src={logo} alt="homepage" className="dark-logo"/></b>
                            <span style={logoTextStyle}><img src={logoText} alt="homepage" className="dark-logo-text" /></span>
                        </a>
                    </div>
                    <div className="navbar-collapse">
                        <ul className="navbar-nav mr-auto mt-md-0">
                            <li className="nav-item">
                                <a className="nav-link nav-toggler hidden-md-up text-muted  ">
                                    <i className="mdi mdi-menu"></i>
                                </a>
                            </li>
                            <li className="nav-item m-l-10">
                                <a className="nav-link sidebartoggler hidden-sm-down text-muted  " onClick={(ev) => this.menuToggle(ev)} >
                                    <i className="ti-menu"></i>
                                </a>
                            </li>
                        </ul>
                        <UserMenu />
                    </div>
                </nav>
            </div>
        )
    }

}
