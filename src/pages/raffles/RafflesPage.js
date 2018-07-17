import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import { Page, Content } from '../../components/page'
import { Table, Column } from '../../components/table'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators, selectors } from '../../reducers/raffles'

import './RafflesPage.css'

/**
 *
 * @since 0.1.0
 */
class RafflesPage extends React.Component {

    componentDidMount () {
        this.props.listRaffles()
    }

    render () {
        return (
            <MainLayout>
                <Page title='Raffles'>
                    <Content>
                        <div className="row">
                            <Table
                                onClick={(row) => console.log('raffle: ', row)}
                                rows={this.props.raffles}>
                                <Column value="id" head="ID"/>
                                <Column value="name" head="Name"/>
                                <Column value="noWinners" head="No Winners"/>
                                <Column value="type" head="Type"/>
                            </Table>
                        </div>
                    </Content>
                </Page>
            </MainLayout>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators(actionCreators, dispatch)
})

const mapStateToProps = (state) => {
    return {
        raffles:  selectors.getRaffles(state)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RafflesPage)
