import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import { Map } from 'immutable'
import { Table, Column } from '../../components/table'
import { Form } from 'react-validify'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Page, Content } from '../../components/page'
import { Button, Text } from '../../components/input'
import { actionCreators as eventActionCreators } from '../../reducers/event'
import { withRouter } from 'react-router-dom'

import './EditEventPage.css'

const VALIDATION_RULES = {
    name: 'required|min:5|max:100',
    description: 'required|min:8'
}

const rows = [
    Map({ id: 'sdfsd', name: 'name' }),
    Map({ id: 'sdfsd', name: 'name' }),
    Map({ id: 'sdfsd', name: 'name' }),
    Map({ id: 'sdfsd', name: 'name' })
]

/**
 * This page adds a new event
 *
 * @since 0.1.0
 */
class EditEventPage extends React.Component {

    componentDidMount () {
        this.props.getDetailInfoRequest(this.props.match.params.id)
    }
    /**
     * Renders new event form
     *
     * @since 0.1.0
     */
    render () {
        return (
            <MainLayout>
                <Page title='Edit Event'>
                    <Content className="needs-validation">
                        <Form rules={VALIDATION_RULES}>
                            <Text name="name"
                                  label="Name"
                                  text={this.props.event.get('name')} />
                            <Text name="description"
                                  label="Description"
                                  text={this.props.event.get('description')} />
                            <label htmlFor="raffles">Raffles</label>
                            <Table
                                onClick={(row) => console.log(row)}
                                rows={rows} >
                                <Column value="id" head="ID" />
                                <Column value="name" head="Name" />
                            </Table>
                        </Form>
                        <hr />
                        <Button
                            submit
                            type="button"
                            value="Add Event"
                            onClick={(values) => this.props.newEventRequest(values)} />
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
        event: state.event.getIn(['event'])
    }
}

export default (
    withRouter(
        connect(mapStateToProps, mapDispatchToProps)(
            EditEventPage
        )
    )
)
