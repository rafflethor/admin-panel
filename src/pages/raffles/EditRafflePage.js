import React from 'react'
import MainLayout from '../../layouts/MainLayout'

import { Page, Content } from '../../components/page'
import { Table, Column } from '../../components/table'
import { Button, Input, Form, Select } from '../../components/input'
import { ConfirmationDialog } from '../../components/modal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators as rafflesActionCreators } from '../../reducers/raffles'
import { withRouter } from 'react-router-dom'

import './EditRafflePage.css'

const VALIDATION_RULES = {
    name: 'required|min:5|max:100',
    type: 'required|in:TWITTER,LIVE',
    cangoon: 'required',
    noWinners: 'required|integer',
}

const TWITTER_VALIDATION_RULES = {
    name: 'required|min:5|max:100',
    type: 'required|in:TWITTER,LIVE',
    hashtag: 'required|min:5',
    noWinners: 'required|integer|min:1'
}

const RaffleActions = (props) => {
    return (
        <React.Fragment>
            <Button
                className="btn-danger mr-3"
                type="button"
                value="Delete"
                onClick={() => props.deleteRaffleModalRequest('deleteEvent')} />
            <Button
                className="btn-warning"
                type="button"
                value="Start"
                onClick={() => props.startRaffleRequest(props.raffleId)} />
        </React.Fragment>
    )
}

const WinnersTable = (winners) => {
    return (
        <React.Fragment>
            <label htmlFor="winners">Winners</label>
            <Table
                onClick={(row) => console.log(row)}
                rows={winners} >
                <Column value="id" head="ID" />
                <Column value="nick" head="Nick" />
                <Column value="ordering" head="Order" />
                <Column value="social" head="Social" />
                <Column value="createdAt" head="When" />
            </Table>
        </React.Fragment>
    )
}

/**
 *
 * @since 0.1.0
 */
class EditRafflePage extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            values: {
                type: props.formValues.type
            }
        }
    }

    componentDidMount () {
        this.props.getRaffleDetails(this.props.match.params.id)
    }

    isTwitter () {
        return this.props.formValues.type !== 'TWITTER'
    }

    getValidationRules () {
        switch (this.state.values.type) {
            case 'TWITTER': return TWITTER_VALIDATION_RULES
            default:
                return VALIDATION_RULES
        }
    }

    render () {
        return (
            <MainLayout>
                <Page title='Edit Raffle'>
                    <Content className="needs-validation">
                        <Form rules={this.getValidationRules()}
                              values={this.props.formValues}
                              onValues={(values) => this.setState({values})}>
                            <div className="form-row">
                                <div className="form-group col-md-12">
                                    <label htmlFor="event">Event</label>
                                    <div className="input-group">
                                        <a className="reference"
                                           onClick={() => this.props.showEventInfoRequest(this.props.organizationId) }>
                                            {this.props.organizationName}
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-4">
                                    <Input type="hidden" name="organizationId" />
                                    <Input type="text" name="name" label="Name" />
                                </div>
                                <div className="form-group col-md-2">
                                    <Input type="number" name="noWinners" label="No Winners" />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-2">
                                    <Select name="preventPreviousWinners" label="Prevent previous winners ?">
                                        <option value='true'>Yes</option>
                                        <option value='false'>No</option>
                                    </Select>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-2">
                                    <Select name="type" label="Type">
                                        <option value='TWITTER'>TWITTER</option>
                                        <option value='LIVE'>LIVE</option>
                                    </Select>
                                </div>
                            </div>
                            { this.isTwitter() || (
                                <React.Fragment>
                                    <div className="form-row">
                                        <div className="form-group col-md-2">
                                            <Input type="text" name="hashtag" label="Hashtag" iconText="#"/>
                                        </div>
                                        <div className="form-group col-md-2">
                                            <Input type="datetime-local" name="since" label="Since"/>
                                        </div>
                                        <div className="form-group col-md-2">
                                            <Input type="datetime-local" name="until" label="Until"/>
                                        </div>
                                    </div>
                                </React.Fragment>)
                            }
                            <div className="form-row">
                                <div className="form-group col-md-12">
                                    <WinnersTable winners={this.props.formValues.winners} />
                                </div>
                            </div>


                <hr />
                            <Button
                submit
                className="mr-3"
                type="button"
                value="Update"
                onClick={(vals) => this.props.updateRaffleRequest(vals, this.props.organizationId)} />
                            <RaffleActions {...this.props} />
                        </Form>
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
            hashtag: state.raffles.getIn(['raffle', 'hashtag']),
            since: state.raffles.getIn(['raffle', 'since']),
            until: state.raffles.getIn(['raffle', 'until']),
            organizationId: state.raffles.getIn(['raffle', 'organization', 'id']),
            noWinners: state.raffles.getIn(['raffle', 'noWinners']),
            preventPreviousWinners: state.raffles.getIn(['raffle', 'preventPreviousWinners']),
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
