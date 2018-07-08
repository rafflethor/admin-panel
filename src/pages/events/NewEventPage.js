import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import { Form } from 'react-validify'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Page, Content } from '../../components/page'
import { Button, Text } from '../../components/input'
import { actionCreators as eventActionCreators } from '../../reducers/event'

import './NewEventPage.css'

const VALIDATION_RULES = {
    name: 'required|min:5|max:100',
    description: 'required|min:8'
}

/**
 * This page adds a new event
 *
 * @since 0.1.0
 */
class NewEventPage extends React.Component {

    /**
     * Renders new event form
     *
     * @since 0.1.0
     */
    render () {
        return (
            <MainLayout>
                <Page title='New Event'>
                    <Content className="needs-validation">
                        <Form rules={VALIDATION_RULES}>
                            <Text name="name" label="Name"/>
                            <Text name="description" label="Description" />
                            <Button
                                submit
                                type="button"
                                value="Add Event"
                                onClick={(values) => this.props.newEventRequest(values)} />
                        </Form>
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
    ...bindActionCreators(eventActionCreators, dispatch)
})

const mapStateToProps = (state) => {
    return {
        event: state
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewEventPage)
