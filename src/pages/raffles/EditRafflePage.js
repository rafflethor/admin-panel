import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import { Form } from 'react-validify'
import { Page, Content } from '../../components/page'
import { Button, Text } from '../../components/input'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { selectors, actionCreators as rafflesActionCreators } from '../../reducers/raffles'
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
                            <Text name="event"
                                  enabled={false}
                                  label="Event"
                                  text={this.props.raffle.id} />

                            <Text name="name"
                                  label="Name"
                                  text={this.props.raffle.name} />
                            <Text name="noWinners"
                                  label="No Winners"
                                  text={this.props.raffle.noWinners} />
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
                            onClick={(v) => this.props.startRaffleRequest(this.props.raffle.id)} />
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
        raffle: selectors.getRaffleDetail(state).toJS()
    }
}

export default (
    withRouter(
        connect(mapStateToProps, mapDispatchToProps)(
            EditRafflePage
        )
    )
)
