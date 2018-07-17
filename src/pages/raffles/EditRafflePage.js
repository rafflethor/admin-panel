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
        //console.log('==>',this.props.match.params.eventId)
    }

    render () {
        const eventId = this.props.match.params.eventId

        return (
            <MainLayout>
                <Page title='Edit Raffle'>
                    <Content className="needs-validation">
                        <Form rules={VALIDATION_RULES}>
                            <Text name="event"
                                  enabled={false}
                                  label="Event"
                                  text={eventId} />
                            <Text name="type"
                                    label="Type ( TWITTER | LIVE )"
                                    text={this.props.type} />
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
                            onClick={(values) => console.log('raffle: ', {...values, eventId})} />
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
    return state
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(
        EditRafflePage
    )
)
