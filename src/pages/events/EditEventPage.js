import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import BootstrapTable from 'react-bootstrap-table-next';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Page, Content } from '../../components/page'
import { Badge } from '../../components/raffles'
import { Button, Input, Form } from '../../components/input'
import { ConfirmationDialog } from '../../components/modal'
import { actionCreators as eventActionCreators } from '../../reducers/event'
import { actionCreators as rafflesActionCreators } from '../../reducers/raffles'
import { withRouter } from 'react-router-dom'

import './EditEventPage.css'

const RAFFLE_COLUMNS = [
    {dataField: 'id', text: 'ID'},
    {
        dataField: 'status',
        text: 'Status',
        formatter: (cell, row) => (<Badge value={row.status}/>),
        align: 'center',
        headerAlign: 'center'
    },
    {dataField: 'name', text: 'Name'},
    {dataField: 'type', text: 'Type'}
]

const VALIDATION_RULES = {
    name: 'required|min:5|max:100',
    description: 'required|min:8'
}

/**
 * This page adds a new event
 *
 * @since 0.1.0
 */
class EditEventPage extends React.Component {

    constructor (props) {
        super(props)
        this.state = {isModalOpen: false}
        this.rowEvents = {
            onClick: (e, row) => this.props.showRaffleRequest(row.id)
        }
    }

    componentDidMount () {
        this.props.getDetailInfoRequest(this.props.match.params.id)
    }

    /**
     * Renders new event form
     *
     * @since 0.1.0
     */
    render () {
        const eventId = this.props.match.params.id
        const isAddRaffleEnabled = eventId ? true : false

        return (
            <MainLayout>
                <Page title='Edit Event'>
                    <Content className="needs-validation">
                        <Form rules={VALIDATION_RULES} values={this.props.eventForm} >
                            <Input name="name" label="Name"/>
                            <Input name="description" label="Description"/>
                        </Form>
                        <label htmlFor="raffles">Raffles</label>
                        <BootstrapTable
                            keyField="id"
                            bordered={false}
                            rowEvents={this.rowEvents}
                            data={this.props.raffles.toJS()}
                            columns={RAFFLE_COLUMNS} />
                        <hr />
                        <Button
                            submit
                            type="button"
                            value="Save Event"
                            onClick={(values) => this.props.newEventRequest(values)} />
                        <Button
                            className="btn-danger ml-2"
                            type="button"
                            value="Delete Event"
                            onClick={() => this.props.deleteEventModalRequest('deleteEvent')} />
                        <Button
                            className={isAddRaffleEnabled ? 'ml-2' : 'disabled ml-2'}
                            enabled={isAddRaffleEnabled}
                            type="button"
                            value="Add New Raffle"
                            onClick={() => this.props.newRaffleForm(eventId)} />
                        <ConfirmationDialog
                            title={`Delete Event: ${this.props.eventForm.name}`}
                            message="Are you sure you want to delete this event?"
                            cancelMessage="Cancel"
                            acceptMessage="Delete"
                            onClickAccept={() => this.props.deleteEventRequest(eventId)} />
                    </Content>
                </Page>
            </MainLayout>
        )
    }
}

/**
 * Binding action creators to props
 *
 * @since 0.1.0
 */
const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators(
        {...eventActionCreators, ...rafflesActionCreators},
        dispatch
    )
})

const mapStateToProps = (state) => {
    return {
        eventForm: {
            name: state.event.getIn(['event', 'name']),
            description: state.event.getIn(['event', 'description']),
        },
        raffles: state.event.getIn(['event', 'raffles'])
    }
}

export default (
    withRouter(
        connect(mapStateToProps, mapDispatchToProps)(
            EditEventPage
        )
    )
)
