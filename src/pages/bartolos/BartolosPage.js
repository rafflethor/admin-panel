import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Page, Content } from '../../components/page'
import MainLayout from '../../layouts/MainLayout'
import defaultAvatar from '../../layouts/images/avatar/6.jpg'
import './BartolosPage.css'

/**
 *
 * @since 0.1.0
 */
class BartolosPage extends React.Component {

    componentDidMount () {

    }

    render () {
        return (
            <MainLayout>
                <Page title='Bartolos'>
                    <Content>
                <div className="row">
                bartolos
                      </div>
                    </Content>
                </Page>
            </MainLayout>
        )
    }
}

export default BartolosPage
