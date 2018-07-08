import React from 'react'

export const Column = ({key, row, value, className}) => {
    return (
        <td key={key} className={className}>{row.get(value)}</td>
    )
}
