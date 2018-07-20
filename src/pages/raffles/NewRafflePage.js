import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import { Form } from 'react-validify'
import { Page, Content } from '../../components/page'
import { Button, Text, Select } from '../../components/input'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators as rafflesActionCreators } from '../../reducers/raffles'
import { actionCreators as eventActionCreators } from '../../reducers/event'
import { withRouter } from 'react-router-dom'
import './NewRafflePage.css'

const VALIDATION_RULES = {
    name: 'required|min:5|max:100',
    type: 'required|in:TWITTER,LIVE',
    noWinners: 'required|integer'
}

const RAFFLE_TYPES = [
    { value: 'TWITTER', label: 'TWITTER' },
    { value: 'LIVE', label: 'LIVE' }
]

/**
 *
 * @since 0.1.0
 */
class NewRafflePage extends React.Component {

    constructor (props) {
        super(props)
        this.state = {type: ''}
    }

    getEventId () {
        return this.props.match.params.eventId
    }

    componentDidMount () {
        this.props.getDetailInfoRequest(this.getEventId())
    }

    handleChange (ev) {
        this.setState({type: ev.target.value})
    }

    render () {
        return (
            <MainLayout>
                <Page title='Edit Raffle'>
                    <Content className="needs-validation">
                        <Form rules={VALIDATION_RULES}>
                            <label htmlFor="event">Event</label>
                            <div className="input-group mb-3">
                                <a className="reference"
                                   onClick={() => this.props.showEventInfoRequest(this.getEventId()) }>
                                    {this.props.eventName}
                                </a>
                            </div>
                            <Select name="type"
                                    value={this.state.type}
                                    options={RAFFLE_TYPES}
                                    onChange={(ev) => this.handleChange(ev) } />
                            <Text name="name"
                                  label="Name"
                                  text={this.props.name} />
                            <Text name="noWinners"
                                  label="No Winners"
                                  text={this.props.type} />
                        <Button
                            submit
                            type="button"
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
