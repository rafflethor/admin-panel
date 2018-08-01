import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import { Page, Content } from '../../components/page'
import { Badge } from '../../components/raffles'
import { Table, Column } from '../../components/table'
import { Button, Input, Form } from '../../components/input'
import { ConfirmationDialog } from '../../components/modal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators as rafflesActionCreators } from '../../reducers/raffles'
import { withRouter } from 'react-router-dom'
import './EditRafflePage.css'

const VALIDATION_RULES = {
    name: 'required|min:5|max:100',
    noWinners: 'required|integer'
}

/**
 *
 * @since 0.1.0
 */
class EditRafflePage extends React.Component {

    componentDidMount () {
        this.props.getRaffleDetails(this.props.match.params.id)
    }

    render () {
        return (
            <MainLayout>
                <Page title='Edit Raffle'>
                    <Content className="needs-validation">
                        <Form rules={VALIDATION_RULES} values={this.props.formValues}>
                            <div className="input-group mb-3">
                                <Badge value={this.props.formValues.status} />
                            </div>
                            <label htmlFor="event">Event</label>
                            <div className="input-group mb-3">
                                <a className="reference"
                                   onClick={() => this.props.showEventInfoRequest(this.props.organizationId) }>
                                    {this.props.organizationName}
                                </a>
                            </div>
                            <Input type="hidden" name="type" />
                            <Input type="hidden" name="id" />
                            <Input name="name" label="Name" />
                            <Input name="noWinners" label="No Winners" />
                            <label htmlFor="winners">Winners</label>
                            <Table
                                onClick={(row) => console.log(row)}
                                rows={this.props.formValues.winners} >
                                <Column value="id" head="ID" />
                                <Column value="nick" head="Nick" />
                                <Column value="ordering" head="Order" />
                                <Column value="social" head="Social" />
                                <Column value="createdAt" head="When" />
                            </Table>
                        <hr />
                        <Button
                            submit
                            className="mr-3"
                            type="button"
                            value="Update"
                            onClick={(vals) => this.props.updateRaffleRequest(vals, this.props.organizationId)} />
                        </Form>
                        <Button
                            className="btn-danger mr-3"
                            type="button"
                            value="Delete"
                            onClick={() => this.props.deleteRaffleModalRequest('deleteEvent')} />
                        <Button
                            type="button"
                            className="btn-warning"
                            value="Start"
                            onClick={(v) => this.props.startRaffleRequest(this.props.raffleId)} />
                        <ConfirmationDialog
                            title={`Delete Raffle: ${this.props.formValues.name}`}
                            message="Are you sure you want to delete this raffle ?"
                            cancelMessage="Cancel"
                            acceptMessage="Delete"
                            onClickAccept={() => {
                                this.props.deleteRaffleRequest(this.props.raffleId, this.props.organizationId)
                            }} />
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
        formValues: {
            id: state.raffles.getIn(['raffle', 'id']),
            type: state.raffles.getIn(['raffle', 'type']),
            name: state.raffles.getIn(['raffle', 'name']),
            status: state.raffles.getIn(['raffle', 'status']),
            noWinners: state.raffles.getIn(['raffle', 'noWinners']),
            winners: state.raffles.getIn(['raffle', 'winners'])
        },
        raffleId: state.raffles.getIn(['raffle', 'id']),
        organizationId: state.raffles.getIn(['raffle', 'organization', 'id']),
        organizationName: state.raffles.getIn(['raffle', 'organization', 'name'])
    }
}

export default (
    withRouter(
        connect(mapStateToProps, mapDispatchToProps)(
            EditRafflePage
        )
    )
)
