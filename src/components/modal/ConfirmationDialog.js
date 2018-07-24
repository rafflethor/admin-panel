import React from 'react'
import Modal from 'react-responsive-modal'
import { Button } from '../../components/input'
import { connect } from 'react-redux'
import { actionCreators as modalActionCreators } from '../../reducers/modal'
import { bindActionCreators } from 'redux'

class ConfirmationDialog extends React.Component {

    render () {
        return (
            <Modal open={this.props.isModalOpen}
                   center={true}
                   showCloseIcon={false}
                   onClose={this.props.closeModal}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{this.props.title}</h5>
                    </div>
                    <div className="modal-body">
                        <p>{this.props.message}</p>
                    </div>
                    <div className="modal-footer">
                        <Button className="btn btn-success"
                                value={this.props.cancelMessage}
                                onClick={this.props.closeModal} />
                        <Button className="btn btn-danger"
                                value={this.props.acceptMessage}
                                onClick={this.props.onClickAccept} />
                    </div>
                </div>
            </Modal>
        )
    }
}

/**
 * Binding action creators to props
 *
 * @since 0.1.0
 */
const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({...modalActionCreators}, dispatch)
})

const mapStateToProps = (state) => ({
    openModalId: state.modal.get('openModalId'),
    isModalOpen: state.modal.get('isModalOpen')
})

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmationDialog)
