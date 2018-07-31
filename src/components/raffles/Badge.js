import React from 'react'

const resolveType = (type) => {
    switch (type) {
        case 'NEW': return 'primary'
        case 'WAITING': return 'primary'
        case 'LIVE': return 'warning'
        case 'FINISHED': return 'success'
        case 'ERROR': return 'danger'
        default:
            return 'primary'
    }
}

export const Badge = ({value}) => {
    const type = resolveType(value)
    return (
        <span className={`label label-rouded label-${type}`}>{value}</span>
    )
}
