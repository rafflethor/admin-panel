import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import { Page, Content, Actions } from '../../components/page'
import { Table, Column } from '../../components/table'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators, selectors } from '../../reducers/events'

import './EventsPage.css'

/**
 *
 * @since 0.1.0
 */
class EventsPage extends React.Component {

    componentDidMount () {
        this.props.listEvents()
    }

    render () {
        return (
            <MainLayout>
                <Page title='Events'>
                    <Actions>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={ () => this.props.newEventForm() }>Add New Event</button>
                    </Actions>
                    <Content>
                        <Table
                            onClick={(row) => console.log(row)}
                            rows={this.props.events} >
                            <Column value="id" head="ID" />
                            <Column value="name" head="Name" />
                            <Column value="description" head="Description" />
                        </Table>
                    </Content>
                </Page>
            </MainLayout>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators(actionCreators, dispatch)
})

const mapStateToProps = (state) => {
    return {
        events:  selectors.getEvents(state)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EventsPage)
