import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import { Form } from 'react-validify'
import { Page, Content } from '../../components/page'
import { Button, Text } from '../../components/input'
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
                        <Form rules={VALIDATION_RULES}>
                            <label htmlFor="event">Event</label>
                            <div className="input-group mb-3">
                                <a className="reference"
                                   onClick={() => this.props.showEventInfoRequest(this.props.organizationId) }>
                                    {this.props.organizationName}
                                </a>
                            </div>
                            <Text name="name"
                                  label="Name"
                                  text={this.props.raffleName} />
                            <Text name="noWinners"
                                  label="No Winners"
                                  text={this.props.noWinners} />
                        <Button
                            submit
                            className="mr-3"
                            type="button"
                            value="Save Raffle"
                            onClick={(values) => console.log('raffle: ', {...values})} />

                        <Button
                            type="button"
                            className="btn-warning"
                            value="Start Raffle"
                            onClick={(v) => this.props.startRaffleRequest(this.props.raffleId)} />
                        </Form>
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
        raffleId: state.raffles.getIn(['raffle', 'id']),
        raffleName: state.raffles.getIn(['raffle', 'name']),
        noWinners: state.raffles.getIn(['raffle', 'noWinners']),
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
