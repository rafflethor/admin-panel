import React from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import { Button } from '../../../components/input'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators as managementActionCreators } from '../../../reducers/management'
import { withRouter } from 'react-router-dom'
import { List } from 'immutable'

const WINNER_COLUMNS = [
    {dataField: 'id', text: 'ID'},
    {dataField: 'nick', text: 'Nick'},
    {dataField: 'ordering', text: 'Order'},
    {dataField: 'social', text: 'Social'},
    {dataField: 'isValid', text: 'Valid'},
    {dataField: 'createdAt', text: 'When'}
]

const ROW_STYLE = (row, rowIndex) => {
    const style= {}
    if (!row.isValid) {
        style.textDecoration = 'line-through'
    }

    return style
}

class ManagementPage extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            selected: []
        }
    }

    componentDidMount () {
        this.props.listAllWinnersRequest(this.props.match.params.id)
    }

    handleOnSelect = (row, isSelect) => {
        if (isSelect) {
            this.setState(() => ({
                selected: [...this.state.selected, row.id]
            }));
        } else {
            this.setState(() => ({
                selected: this.state.selected.filter(x => x !== row.id)
            }));
        }
    }

    handleOnSelectAll = (isSelect, rows) => {
        const ids = rows.map(r => r.id);
        if (isSelect) {
            this.setState(() => ({
                selected: ids
            }));
        } else {
            this.setState(() => ({
                selected: []
            }));
        }
    }

    handleDeleteSelected = () => {
        const winnersIds = this.state.selected
        const raffleId = this.props.match.params.id

        this.props.markWinnersAsNonValidRequest(winnersIds, raffleId)
    }

    handleStartRaffle = () => {
        const raffleId = this.props.match.params.id

        this.props.startRaffleRequest(raffleId)
    }

    render () {
        const winners = (this.props.winners || List()).toJSON()
        const deleteEnabled = this.state.selected.length > 0

        const WINNER_SELECTION_MODE = {
            mode: 'checkbox',
            clickToSelect: true,
            selected: this.state.selected,
            onSelect: this.handleOnSelect,
            onSelectAll: this.handleOnSelectAll
        }

        const liveClassName = this.props.raffleLoading && 'liveButton'

        return (
            <div className="form-row">
                <div className="form-group col-md-12">
                    <label htmlFor="winners">Winners</label>
                    <BootstrapTable
                        keyField="id"
                        bordered={false}
                        rowStyle={ROW_STYLE}
                        data={winners}
                        selectRow={WINNER_SELECTION_MODE}
                        columns={WINNER_COLUMNS} />
                    <hr />
                    <Button
                        submit
                        className={`mr-3 ${liveClassName}`}
                        type="button"
                        value={this.props.raffleLoading ? 'Live...' : 'Start'}
                        enabled={!this.props.raffleLoading}
                        onClick={() => this.handleStartRaffle()} />
                    <Button
                        submit
                        className="mr-3 btn-danger"
                        type="button"
                        enabled={deleteEnabled}
                        value="Omit Selected"
                        onClick={() => this.handleDeleteSelected()} />
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators(managementActionCreators, dispatch)
})

const mapStateToProps = (state) => {
    return {
        winners: state.management.getIn(['winners']),
        raffleLoading: state.management.getIn(['raffleLoading'])
    }
}

export default (
    withRouter(
        connect(mapStateToProps, mapDispatchToProps)(
            ManagementPage
        )
    )
)
