import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import { Page, Content } from '../../components/page'
import { Button, Input, Form } from '../../components/input'
import { ConfirmationDialog } from '../../components/modal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators as rafflesActionCreators } from '../../reducers/raffles'
import { withRouter } from 'react-router-dom'
import './EditRafflePage.css'

const VALIDATION_RULES = {
    name: 'required|min:5|max:100',
    type: 'required|in:TWITTER,LIVE',
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
                            <label htmlFor="event">Event</label>
                            <div className="input-group mb-3">
                                <a className="reference"
                                   onClick={() => this.props.showEventInfoRequest(this.props.organizationId) }>
                                    {this.props.organizationName}
                                </a>
                            </div>
                            <Input name="name" label="Name" />
                            <Input name="noWinners" label="No Winners" />
                        <Button
                            submit
                            className="mr-3"
                            type="button"
                            value="Save Raffle"
                            onClick={(values) => console.log('raffle: ', {...values})} />
                        </Form>
                        <Button
                            className="btn-danger mr-3"
                            type="button"
                            value="Delete Event"
                            onClick={() => this.props.deleteRaffleModalRequest('deleteEvent')} />
                        <Button
                            type="button"
                            className="btn-warning"
                            value="Start Raffle"
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
            name: state.raffles.getIn(['raffle', 'name']),
            noWinners: state.raffles.getIn(['raffle', 'noWinners']),
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
