import React from 'react'

const withComponent = ({Component, ...props}) => {
    const rowValue = props.row.get(props.value)

    return (
        <td key={props.key} className={props.className}>
            <Component value={rowValue} />
        </td>
    )
}

const withoutComponent = (props) => {
    return (
        <td key={props.key} className={props.className}>{props.row.get(props.value)}</td>
    )
}

export const Column = (props) => {
    return props.Component ?
        withComponent(props) :
        withoutComponent(props)
}
