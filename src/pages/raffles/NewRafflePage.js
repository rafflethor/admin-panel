import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import { Page, Content } from '../../components/page'
import { Button, Input, Select, Form } from '../../components/input'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators as rafflesActionCreators } from '../../reducers/raffles'
import { actionCreators as eventActionCreators } from '../../reducers/event'
import { withRouter } from 'react-router-dom'
import './NewRafflePage.css'

const VALIDATION_RULES = {
    name: 'required|min:5|max:100',
    type: 'required|in:TWITTER,LIVE',
    cangoon: 'required',
    noWinners: 'required|integer'
}

const TWITTER_VALIDATION_RULES = {
    name: 'required|min:5|max:100',
    type: 'required|in:TWITTER,LIVE',
    hashtag: 'required|min:5',
    noWinners: 'required|integer|min:1',
    since: 'required|date',
    until: 'required|date'
}

/**
 *
 * @since 0.1.0
 */
class NewRafflePage extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            values: {
                type: 'LIVE',
                cangoon: "yes"
            }
        }
    }

    getEventId () {
        return this.props.match.params.eventId
    }

    componentDidMount () {
        this.props.getDetailInfoRequest(this.getEventId())
    }

    isTwitter () {
        return this.state.values.type !== 'TWITTER'
    }

    getValidationRules () {
        switch (this.state.values.type) {
            case 'TWITTER': return TWITTER_VALIDATION_RULES
            default:
                return VALIDATION_RULES
        }
    }

    render () {
        const validationRules = this.getValidationRules()

        return (
            <MainLayout>
                <Page title='Edit Raffle'>
                    <Content className="needs-validation">
                        <Form rules={validationRules}
                              values={this.state.values}
                              onValues={(values) => this.setState({values})}>
                            <label htmlFor="event">Event</label>
                            <div className="input-group mb-3">
                                <a className="reference"
                                   onClick={() => this.props.showEventInfoRequest(this.getEventId()) }>
                                    {this.props.eventName}
                                </a>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-4">
                                    <Input name="name" label="Name" />
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
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-2">
                                            <Input type="datetime-local" name="since" label="Since" />
                                        </div>
                                        <div className="form-group col-md-2">
                                            <Input type="datetime-local" name="until" label="Until" />
                                        </div>
                                    </div>
                                </React.Fragment>)
                            }
                        <Button
                            submit
                            type="button"
                            className="mt-3"
                            value="Save Raffle"
                            onClick={(vals) => this.props.saveRaffleRequest({...vals, organizationId: this.getEventId()})} />
                        </Form>
                    </Content>
                </Page>
            </MainLayout>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators(
        {...rafflesActionCreators, ...eventActionCreators},
        dispatch
    )
})

const mapStateToProps = (state) => {
    return {
        eventName: state.event.getIn(['event', 'name'])
    }
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(
        NewRafflePage
    )
)
