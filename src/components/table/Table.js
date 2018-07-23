import React from 'react'

import './Table.css'

export class Table extends React.Component {

    renderRow (row, column, index) {
        return (React.cloneElement(column, {...column.props, row: row, key: `${row.get('id')}-${index}`}))
    }

    renderHeader (column, index) {
        return (
            <th key={`${column.props.head}-${index}`}>{column.props.head}</th>
        )
    }

    renderRows (rows, columns, onClick) {
        const fn = onClick || function () {}

        return rows && rows.size > 0 ? rows.map((row) => (
            <tr key={row.get('id')} onClick={() => fn(row) } className={this.props.rowClassName}>
                { columns.map((column, index) => this.renderRow(row, column, index)) }
            </tr>
        )) : (<tr><td className="text-center" colSpan={columns.length}>No data found</td></tr>)
    }

    render () {
        return (
            <table className={`table table-striped ${this.props.className}`}>
                <thead>
                    <tr>
                        { this.props.children.map((column, index) => this.renderHeader(column, index)) }
                    </tr>
                </thead>
                <tbody>
                    { (this.renderRows(this.props.rows, this.props.children, this.props.onClick)) }
                </tbody>
            </table>
        )
    }
}
