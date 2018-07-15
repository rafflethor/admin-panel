import React from 'react'
import { Page, Content } from '../../components/page'
import MainLayout from '../../layouts/MainLayout'
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
