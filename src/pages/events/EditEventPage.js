import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import { Table, Column } from '../../components/table'
import { Form } from 'react-validify'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Page, Content } from '../../components/page'
import { Button, Text } from '../../components/input'
import { actionCreators as eventActionCreators } from '../../reducers/event'
import { actionCreators as rafflesActionCreators } from '../../reducers/raffles'
import { withRouter } from 'react-router-dom'

import './EditEventPage.css'

const VALIDATION_RULES = {
    name: 'required|min:5|max:100',
    description: 'required|min:8'
}

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
        const isAddRaffleEnabled = this.props.match.params.id ? true : false

        return (
            <MainLayout>
                <Page title='Edit Event'>
                    <Content className="needs-validation">
                        <Form rules={VALIDATION_RULES}>
                            <Text name="name"
                                  label="Name"
                                  text={this.props.name} />
                            <Text name="description"
                                  label="Description"
                                  text={this.props.description} />
                            <label htmlFor="raffles">Raffles</label>
                            <Table
                                onClick={(row) => this.props.showRaffleRequest(row.get('id'))}
                                rows={this.props.raffles} >
                                <Column value="id" head="ID" />
                                <Column value="name" head="Name" />
                                <Column value="type" head="Type" />
                            </Table>
                        </Form>
                        <hr />
                        <Button
                            submit
                            type="button"
                            value="Save Event"
                            onClick={(values) => this.props.newEventRequest(values)} />
                            <Button
                                className={isAddRaffleEnabled ? 'ml-2' : 'disabled ml-2'}
                                enabled={isAddRaffleEnabled}
                                type="button"
                                value="Add New Raffle"
                                onClick={(event) => console.log('add new raffle: ', event)} />
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
    ...bindActionCreators(
        {...eventActionCreators, ...rafflesActionCreators},
        dispatch
    )
})

const mapStateToProps = (state) => {
    return {
        name: state.event.getIn(['event', 'name']),
        description: state.event.getIn(['event', 'description']),
        raffles: state.event.getIn(['event', 'raffles'])
    }
}

export default (
    withRouter(
        connect(mapStateToProps, mapDispatchToProps)(
            EditEventPage
        )
    )
)
