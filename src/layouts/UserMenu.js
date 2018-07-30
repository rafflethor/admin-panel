import React from 'react'

import storage from '../client/storage'
import defaultAvatar from './images/avatar/6.jpg'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators as uiActionCreators } from '../reducers/ui'
import { actionCreators as securityActionCreators } from '../reducers/security'

/**
 *
 * @since 0.1.0
 */
class UserMenu extends React.Component {

    handleUserMenuToggle (ev) {
        ev.preventDefault()
        this.props.showUserMenu(!this.props.userMenuVisible)
    }

    render () {
        const showUser = this.props.userMenuVisible ? 'show' : ''
        const username = storage
              .get('login')
              .username

        return (
            <ul className="navbar-nav my-lg-0">
                <li className={`nav-item dropdown ${showUser}`}>
                    <a className="nav-link text-muted">{username}</a>
                </li>
                <li className={`nav-item dropdown ${showUser}`}>
                    <a className={`nav-link dropdown-toggle text-muted ${showUser}`}
                       data-toggle="dropdown"
                       aria-haspopup="true"
                       aria-expanded={this.props.userMenuVisible}
                       onClick={(ev) => this.handleUserMenuToggle(ev)}
                        >
                        <img src={defaultAvatar} alt="user" className="profile-pic" />
                    </a>
                    <div className={`dropdown-menu dropdown-menu-right animated zoomIn ${showUser}`}>
                        <ul className="dropdown-user">
                            <li>
                                <a onClick={this.props.logout}>
                                    <i className="fa fa-power-off"></i>
                                    Logout
                                </a>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userMenuVisible: state.ui.get('userMenuVisible')
    }
}

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators(
        {...securityActionCreators,...uiActionCreators},
        dispatch
    )
})

export default (
    connect(mapStateToProps, mapDispatchToProps)(
        UserMenu
    )
)
