import React from 'react';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Header } from './Header'
import { Sidebar } from './Sidebar'
import { actionCreators as uiActionCreators } from '../reducers/ui'
import ReduxToastr from 'react-redux-toastr'
import './bootstrap.min.css'
import './style.css'
import './helper.css'
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'

class MainLayout extends React.Component {

    toggleSidebar (visible) {
        return visible ? 'fix-header' : 'fix-header mini-sidebar'
    }

    render () {
        const sidebarStyle = this.toggleSidebar(this.props.menuVisible)

        return (
            <div className={sidebarStyle}>
                <div id="main-wrapper">
                    <Header
                        menuVisible={this.props.menuVisible}
                        onShowMenu={this.props.showMenu}/>
                    <Sidebar />
                    <ReduxToastr preventDuplicates position="bottom-left"/>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators(uiActionCreators, dispatch),
})

const mapStateToProps = (state) => {
    return {
        menuVisible: state.ui.get('menuVisible')
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainLayout)
