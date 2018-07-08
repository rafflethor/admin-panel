import React from 'react'
import { Page, Content } from '../../components/page'
import MainLayout from '../../layouts/MainLayout'
import './UsersPage.css'

/**
 *
 * @since 0.1.0
 */
class UsersPage extends React.Component {

    componentDidMount () {

    }

    render () {
        return (
            <MainLayout>
                <Page title='Users'>
                    <Content>
                <div className="row">
                Users
                      </div>
                    </Content>
                </Page>
            </MainLayout>
        )
    }
}

export default UsersPage
