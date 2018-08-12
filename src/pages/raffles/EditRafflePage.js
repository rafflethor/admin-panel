import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import DetailsPage from './edit/DetailsPage'
import ManagementPage from './edit/ManagementPage'
import { Page, Content } from '../../components/page'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators as rafflesActionCreators } from '../../reducers/raffles'

import './EditRafflePage.css'

/**
 *
 * @since 0.1.0
 */
class EditRafflePage extends React.Component {

    isDetails () {
        return this.props.tab === 'DETAILS'
    }

    isManagement () {
        return this.props.tab === 'MANAGEMENT'
    }

    render () {
        const detailsClassName = this.isDetails() ? 'nav-link active' : 'nav-link'
        const managementClassName = this.isManagement() ? 'nav-link active' : 'nav-link'

        return (
            <MainLayout>
                <Page title='Edit Raffle'>
                    <Content className="needs-validation">
                        <div className="row">
                            <div className="col-md-12">
                                <ul className="nav nav-tabs">
                                    <li className="nav-item">
                                        <a className={detailsClassName}
                                           onClick={() => this.props.changeToDetails()}>Details</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className={managementClassName}
                                           onClick={() => this.props.changeToManagement()}>Management</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 padding-2">
                                { this.isDetails() ? <DetailsPage /> : <ManagementPage /> }
                            </div>
                        </div>
                    </Content>
                </Page>
            </MainLayout>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators(rafflesActionCreators, dispatch)
})

const mapStateToProps = (state) => {
    return {
        tab: state.raffles.get('tab')
    }
}

export default (
    connect(mapStateToProps, mapDispatchToProps)(
        EditRafflePage
    )
)
