import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Page, Content } from '../../components/page'
import {
    actionCreators as dashboardActionCreators,
    selectors
} from '../../reducers/dashboard'
import MainLayout from '../../layouts/MainLayout'
// import defaultAvatar from '../../layouts/images/avatar/6.jpg'
import { CounterPanel } from './panels/CounterPanel'
import './DashboardPage.css'

/**
 *
 * @since 0.1.0
 */
class DashboardPage extends React.Component {

    componentDidMount () {
        this.props.loadStats()
    }

    render () {
        return (
            <MainLayout>
                <Page title='Dashboard'>
                    <Content>
                        <div className="row">
                            <div className="col-md-3">
                                <CounterPanel
                                    title='Twitter'
                                    icon='twitter'
                                    count={this.props.stats.twitterRaffles} />
                            </div>
                            <div className="col-md-3">
                                <CounterPanel
                                   title='Live'
                                    icon='bullhorn'
                                    count={this.props.stats.randomListRaffles} />
                            </div>
                            <div className="col-md-3">
                                <CounterPanel
                                    title='Participants'
                                    icon='users'
                                    count={this.props.stats.users} />
                            </div>
                            <div className="col-md-3">
                                <CounterPanel
                                    title='Bartolos'
                                    icon='reddit-alien'
                                    count={this.props.stats.bartolos} />
                            </div>
                        </div>
                    </Content>
                </Page>
            </MainLayout>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators(dashboardActionCreators, dispatch)
})

const mapStateToProps = (state) => {
    return {
        stats:  selectors.getStats(state)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardPage)
